import { FieldConfig } from 'app/pages/common/entity/entity-form/models/field-config.interface';
import { FieldSet } from 'app/pages/common/entity/entity-form/models/fieldset.interface';
import { FieldSets } from 'app/pages/common/entity/entity-form/classes/field-sets';
import { Subject } from 'rxjs';
import { CoreEvent } from 'app/core/services/core.service';
import { EntityFormComponent } from 'app/pages/common/entity/entity-form';

export interface FormConfiguration {
  fieldSets?: FieldSets | FieldSet[];
  fieldSetDisplay?: string;
  saveSubmitText?: string;
  target?: Subject<CoreEvent>;
  resource_name?: string;
  isEntity?: boolean;
  addCall?: string;
  editCall?: string;
  isEditJob?: boolean;
  queryCall?: string;
  queryCallOption?: any[];
  queryKey?: string; // use this to define your id for websocket call
  isNew?: boolean;
  pk?: number | string;
  rowid?: number | string;
  custom_get_query?: string;
  fieldConfig?: FieldConfig[];
  route_usebaseUrl?: boolean;
  route_cancel?: string[];
  route_success?: string[];
  route_delete?: string[];
  custom_edit_query?: string;
  custom_add_query?: string;
  custActions?: {
    id: string;
    name: string;
    function: () => void;
  }[];
  compactCustomActions?: {
    id: string;
    name: string;
    function: () => void;
  }[];
  customFilter?: any[];
  confirmSubmit?: boolean;
  confirmSubmitDialog?: {
    title: string;
    message: string;
    hideCheckbox?: boolean;
    button?: string;
  };
  save_button_enabled?: boolean;
  hideSaveBtn?: boolean;
  form_message?: {
    type: string; // info || warning
    content: string;
  };
  hide_fileds?: string[];
  isBasicMode?: boolean;
  advanced_field?: string[];
  basic_field?: string[];
  route_conf?: string[];
  initialCount?: number;
  initialCount_default?: number;
  title?: string;
  columnsOnForm?: number;

  prerequisite?(): void;
  customEditCall?: (value: any) => void;
  preHandler?: (data: any[], formArray: any) => any[];
  responseOnSubmit?: (value: any) => void;
  clean?: (data: any) => any;
  errorReport?: (res: any) => void;
  resourceTransformIncomingRestData?: (data: any) => any;
  preInit?: (entityForm: EntityFormComponent) => void;
  afterInit?: (entityForm: EntityFormComponent) => void;
  initial?: (entityForm: EntityFormComponent) => void;
  dataHandler?: (entityForm: EntityFormComponent) => void;
  dataAttributeHandler?: (entityForm: EntityFormComponent) => void;
  afterSave?: (entityForm: EntityFormComponent) => void;
  blurEvent?: (entityForm: EntityFormComponent) => void;
  afterSubmit?: (value: any) => void;
  beforeSubmit?: (entityForm: EntityFormComponent) => void;
  customSubmit?: (value: any) => void;
  closeModalForm?(): Promise<boolean>;
  afterModalFormClosed?(): void; // function will called once the modal form closed
}
