import {
  Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { MatColumnDef, MatRowDef, MatTableDataSource } from '@angular/material/table';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { ConvertBytesToHumanReadablePipe } from 'app/core/components/pipes/convert-bytes-to-human-readable.pipe';
import { FormatDateTimePipe } from 'app/core/components/pipes/format-datetime.pipe';
import { Option } from 'app/interfaces/option.interface';
import { IxTableComponent } from 'app/modules/ix-tables/components/ix-table/ix-table.component';
import { SnapshotListEvent, SnapshotListActions } from 'app/pages/storage/snapshots/interfaces/snapshot-list-event.interface';
import { SnapshotListRow } from 'app/pages/storage/snapshots/interfaces/snapshot-list-row.interface';

@UntilDestroy()
@Component({
  selector: 'app-snapshot-details',
  templateUrl: './snapshot-details.component.html',
  styleUrls: ['./snapshot-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormatDateTimePipe, ConvertBytesToHumanReadablePipe],
})
export class SnapshotDetailsComponent implements OnInit, OnDestroy {
  @Input() expandedRow: SnapshotListRow;
  @Input() dataSource: MatTableDataSource<SnapshotListRow>;
  @Input() colspan: number;
  @Output() actionPressed = new EventEmitter<SnapshotListEvent>();
  @ViewChild(MatRowDef, { static: false }) rowDef: MatRowDef<SnapshotListRow>;
  @ViewChild(MatColumnDef, { static: false }) columnDef: MatColumnDef;

  constructor(
    private table: IxTableComponent<SnapshotListRow>,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private formatDateTimePipe: FormatDateTimePipe,
    private convertBytestoHumanReadable: ConvertBytesToHumanReadablePipe,
  ) { }

  ngOnInit(): void {
    if (this.table) {
      this.cdr.detectChanges();
      this.table.addColumnDef(this.columnDef);
      this.table.addRowDef(this.rowDef);
    }
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.removeRowDef(this.rowDef);
      this.table.removeColumnDef(this.columnDef);
    }
  }

  getDetails(snapshot: SnapshotListRow): Option[] {
    return [
      { label: this.translate.instant('Used'), value: snapshot?.used ? this.convertBytestoHumanReadable.transform(snapshot.used) : 'N/A' },
      { label: this.translate.instant('Date Created'), value: snapshot?.created ? this.formatDateTimePipe.transform(snapshot.created) : 'N/A' },
      { label: this.translate.instant('Referenced'), value: snapshot?.referenced ? this.convertBytestoHumanReadable.transform(snapshot.referenced) : 'N/A' },
    ];
  }

  doClone(row: SnapshotListRow): void {
    this.actionPressed.emit({ action: SnapshotListActions.Clone, row });
  }

  doRollback(row: SnapshotListRow): void {
    this.actionPressed.emit({ action: SnapshotListActions.Rollback, row });
  }

  doDelete(row: SnapshotListRow): void {
    this.actionPressed.emit({ action: SnapshotListActions.Delete, row });
  }
}