import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { CoreComponents } from 'app/core/components/core-components.module';
import { CommonDirectivesModule } from 'app/directives/common/common-directives.module';
import { EntityModule } from 'app/modules/entity/entity.module';
import { IxFormsModule } from 'app/modules/ix-forms/ix-forms.module';
import { IxTableModule } from 'app/modules/ix-tables/ix-table.module';
import { SnapshotAddComponent } from 'app/pages/storage/snapshots/snapshot-add/snapshot-add.component';
import { SnapshotCloneDialogComponent } from 'app/pages/storage/snapshots/snapshot-clone-dialog/snapshot-clone-dialog.component';
import { SnapshotRollbackDialogComponent } from 'app/pages/storage/snapshots/snapshot-rollback-dialog/snapshot-rollback-dialog.component';
import { SnapshotDetailsComponent } from 'app/pages/storage/snapshots/snapshot-table/components/snapshot-details/snapshot-details.component';
import { SnapshotTableComponent } from 'app/pages/storage/snapshots/snapshot-table/snapshot-table.component';
import { routing } from 'app/pages/storage/snapshots/snapshots.routing';
import { SnapshotEffects } from 'app/pages/storage/snapshots/store/snapshot.effects';
import { snapshotReducer } from 'app/pages/storage/snapshots/store/snapshot.reducer';
import { snapshotStateKey } from 'app/pages/storage/snapshots/store/snapshot.selectors';

@NgModule({
  providers: [],
  imports: [
    CommonDirectivesModule,
    CommonModule,
    CoreComponents,
    EffectsModule.forFeature([SnapshotEffects]),
    EntityModule,
    IxFormsModule,
    IxTableModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRippleModule,
    MatTooltipModule,
    RouterModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forFeature(snapshotStateKey, snapshotReducer),
    TranslateModule,
    TranslateModule,
  ],
  declarations: [
    SnapshotTableComponent,
    SnapshotAddComponent,
    SnapshotCloneDialogComponent,
    SnapshotDetailsComponent,
    SnapshotRollbackDialogComponent,
  ],
  exports: [
    SnapshotTableComponent,
    SnapshotAddComponent,
    SnapshotCloneDialogComponent,
    SnapshotDetailsComponent,
    SnapshotRollbackDialogComponent,
  ],
})
export class SnapshotsModule { }