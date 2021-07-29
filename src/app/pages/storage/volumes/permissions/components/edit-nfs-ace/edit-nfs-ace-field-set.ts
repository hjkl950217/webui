import {
  NfsAclTag, NfsAclType, NfsBasicFlag,
} from 'app/enums/nfs-acl.enum';
import helptext from 'app/helptext/storage/volumes/datasets/dataset-acl';
import { FieldSet } from 'app/pages/common/entity/entity-form/models/fieldset.interface';
import { RelationAction } from 'app/pages/common/entity/entity-form/models/relation-action.enum';
import {
  NfsFormFlagsType,
  NfsFormPermsType,
} from 'app/pages/storage/volumes/permissions/components/edit-nfs-ace/edit-nfs-ace-form-values.interface';
import { getFormUserGroupLoaders } from 'app/pages/storage/volumes/permissions/utils/get-form-user-group-loaders.utils';
import { newNfsAce } from 'app/pages/storage/volumes/permissions/utils/new-ace.utils';
import { UserService } from 'app/services';

export function getEditNfsAceFieldSet(userService: UserService): FieldSet[] {
  const {
    loadMoreUserOptions,
    loadMoreGroupOptions,
    updateUserSearchOptions,
    updateGroupSearchOptions,
  } = getFormUserGroupLoaders(userService);

  return [
    {
      name: helptext.dataset_acl_title_list,
      label: true,
      width: '50%',
      config: [
        {
          type: 'select',
          name: 'tag',
          placeholder: helptext.dataset_acl_tag_placeholder,
          options: helptext.dataset_acl_tag_options,
          tooltip: helptext.dataset_acl_tag_tooltip,
          required: true,
        },
        {
          type: 'combobox',
          name: 'user',
          placeholder: helptext.dataset_acl_user_placeholder,
          tooltip: helptext.dataset_acl_user_tooltip,
          updateLocal: true,
          options: [],
          searchOptions: [],
          updater: updateUserSearchOptions,
          loadMoreOptions: loadMoreUserOptions,
          isHidden: true,
          required: true,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'tag',
                value: NfsAclTag.User,
              }],
            },
          ],
        },
        {
          type: 'combobox',
          name: 'group',
          placeholder: helptext.dataset_acl_group_placeholder,
          tooltip: helptext.dataset_acl_group_tooltip,
          updateLocal: true,
          options: [],
          searchOptions: [],
          updater: updateGroupSearchOptions,
          loadMoreOptions: loadMoreGroupOptions,
          isHidden: true,
          required: true,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'tag',
                value: NfsAclTag.UserGroup,
              }],
            },
          ],
        },
        {
          type: 'radio',
          name: 'type',
          placeholder: helptext.dataset_acl_type_placeholder,
          tooltip: helptext.dataset_acl_type_tooltip,
          options: helptext.dataset_acl_type_options,
          required: true,
          value: NfsAclType.Allow,
        },
      ],
    },
    { name: 'divider', divider: true },
    {
      name: helptext.dataset_acl_perms_set_title,
      label: true,
      width: '50%',
      config: [
        {
          type: 'radio',
          name: 'permissionType',
          required: true,
          placeholder: helptext.dataset_acl_perms_type_placeholder,
          tooltip: helptext.dataset_acl_perms_type_tooltip,
          options: helptext.dataset_acl_perms_type_options,
          value: NfsFormPermsType.Basic,
        },
        {
          type: 'select',
          name: 'basicPermission',
          required: true,
          placeholder: helptext.dataset_acl_perms_placeholder,
          tooltip: helptext.dataset_acl_perms_tooltip,
          options: helptext.dataset_acl_basic_perms_options,
          value: newNfsAce.perms.BASIC,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'permissionType',
                value: NfsFormPermsType.Basic,
              }],
            },
          ],
        },
        {
          type: 'select',
          multiple: true,
          isHidden: true,
          required: true,
          name: 'advancedPermissions',
          placeholder: helptext.dataset_acl_perms_placeholder,
          tooltip: helptext.dataset_acl_perms_tooltip,
          options: helptext.dataset_acl_advanced_perms_options,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'permissionType',
                value: NfsFormPermsType.Advanced,
              }],
            },
          ],
        },
      ],
    },
    {
      name: helptext.dataset_acl_flags_set_title,
      label: true,
      width: '50%',
      config: [
        {
          type: 'radio',
          name: 'flagsType',
          required: true,
          placeholder: helptext.dataset_acl_flags_type_placeholder,
          tooltip: helptext.dataset_acl_flags_type_tooltip,
          options: helptext.dataset_acl_flags_type_options,
          value: newNfsAce.flags.BASIC,
        },
        {
          type: 'select',
          name: 'basicFlag',
          placeholder: helptext.dataset_acl_flags_placeholder,
          tooltip: helptext.dataset_acl_flags_tooltip,
          options: helptext.dataset_acl_basic_flags_options,
          value: NfsBasicFlag.Inherit,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'flagsType',
                value: NfsFormFlagsType.Basic,
              }],
            },
          ],
        },
        {
          type: 'select',
          multiple: true,
          isHidden: true,
          required: true,
          name: 'advancedFlags',
          placeholder: helptext.dataset_acl_flags_placeholder,
          tooltip: helptext.dataset_acl_flags_tooltip,
          options: helptext.dataset_acl_advanced_flags_options,
          relation: [
            {
              action: RelationAction.Show,
              when: [{
                name: 'flagsType',
                value: NfsFormFlagsType.Advanced,
              }],
            },
          ],
        },
      ],
    },
  ];
}