import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { of, Subject } from 'rxjs';
import { CoreComponents } from 'app/core/components/core-components.module';
import { mockCall, mockWebsocket } from 'app/core/testing/utils/mock-websocket.utils';
import { ZfsSnapshot } from 'app/interfaces/zfs-snapshot.interface';
import { EntityModule } from 'app/modules/entity/entity.module';
import { IxTableModule } from 'app/modules/ix-tables/ix-table.module';
import { IxTableHarness } from 'app/modules/ix-tables/testing/ix-table.harness';
import { SnapshotDetailsComponent } from 'app/pages/storage/snapshots/snapshot-table/components/snapshot-details/snapshot-details.component';
import { loadSnapshots } from 'app/pages/storage/snapshots/store/snapshot.actions';
import { SnapshotEffects } from 'app/pages/storage/snapshots/store/snapshot.effects';
import { adapter, snapshotReducer } from 'app/pages/storage/snapshots/store/snapshot.reducer';
import { DialogService, ModalService, WebSocketService } from 'app/services';
import { snapshotsNotLoaded } from '../store/snapshot.actions';
import { snapshotsInitialState } from '../store/snapshot.reducer';
import { snapshotStateKey } from '../store/snapshot.selectors';
import { SnapshotTableComponent } from './snapshot-table.component';

export const fakeDataSource: ZfsSnapshot[] = [{
  id: 'snapshot-id',
  name: 'snapshot-name',
  dataset: 'my-dataset',
  snapshot_name: 'snapshot-name',
  properties: {
    creation: {
      parsed: {
        $date: 1634575914000,
      },
    },
  },
}] as ZfsSnapshot[];

describe('SnapshotTableComponent', () => {
  let spectator: Spectator<SnapshotTableComponent>;
  let loader: HarnessLoader;
  let ws: WebSocketService;

  const createComponent = createComponentFactory({
    component: SnapshotTableComponent,
    imports: [
      CoreComponents,
      EntityModule,
      IxTableModule,
      StoreModule.forRoot({ [snapshotStateKey]: snapshotReducer }, {
        initialState: {
          [snapshotStateKey]: adapter.setAll([...fakeDataSource], snapshotsInitialState),
        },
      }),
      EffectsModule.forRoot([SnapshotEffects]),
    ],
    declarations: [
      MockComponent(SnapshotDetailsComponent),
    ],
    providers: [
      mockWebsocket([
        mockCall('zfs.snapshot.query', fakeDataSource),
        mockCall('zfs.snapshot.clone'),
        mockCall('zfs.snapshot.rollback'),
        mockCall('zfs.snapshot.delete'),
        mockCall('zfs.snapshot.create'),
      ]),
      mockProvider(DialogService),
      mockProvider(ModalService, {
        openInSlideIn: jest.fn(() => of(true)),
        onClose$: new Subject<unknown>(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
    ws = spectator.inject(WebSocketService);
  });

  xit('should show table rows', async () => {
    spectator.inject(Store).dispatch(loadSnapshots({ extra: false }));

    const table = await loader.getHarness(IxTableHarness);
    const cells = await table.getCells(true);

    const expectedRows = [
      ['', 'Dataset', 'Snapshot', ''],
      [''],
    ];

    expect(ws.call).toHaveBeenCalledWith('zfs.snapshot.query', [
      [['pool', '!=', 'freenas-boot'], ['pool', '!=', 'boot-pool']],
      { order_by: ['name'], select: ['name'] },
    ]);
    expect(cells).toEqual(expectedRows);
  });

  xit('should show table with extra rows', async () => {
    spectator.inject(Store).dispatch(loadSnapshots({ extra: true }));
    spectator.detectChanges();
    const table = await loader.getHarness(IxTableHarness);
    const cells = await table.getCells(true);

    const expectedRows = [
      ['', 'Dataset', 'Snapshot', 'Used', 'Date created', 'Referenced', ''],
      ['', '0', 'true', 'root', 'expand_more'],
    ];

    expect(ws.call).toHaveBeenCalledWith('zfs.snapshot.query', [
      [['pool', '!=', 'freenas-boot'], ['pool', '!=', 'boot-pool']],
      { order_by: ['name'], select: ['name', 'properties'] },
    ]);
    expect(cells).toEqual(expectedRows);
  });

  xit('should have empty message when loaded and datasource is empty', async () => {
    spectator.inject(Store).dispatch(loadSnapshots({ extra: false }));

    const table = await loader.getHarness(IxTableHarness);
    const text = await table.getCellTextByIndex();

    expect(text).toEqual([['No snapshots are available.']]);
  });

  xit('should have error message when can not retrieve response', async () => {
    spectator.inject(Store).dispatch(snapshotsNotLoaded({ error: 'Snapshots could not be loaded' }));

    const table = await loader.getHarness(IxTableHarness);
    const text = await table.getCellTextByIndex();

    expect(text).toEqual([['Snapshots could not be loaded']]);
  });

  it('should expand row on click', async () => {
    const table = await loader.getHarness(IxTableHarness);
    const [firstRow] = await table.getRows();

    const element = await firstRow.host();
    await element.click();

    expect(element.hasClass('expanded-row')).toBeTruthy();
  });
});