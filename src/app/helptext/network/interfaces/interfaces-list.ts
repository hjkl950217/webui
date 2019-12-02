import { T } from '../../../translate-marker';
import { Validators } from '@angular/forms';
import { rangeValidator } from '../../../pages/common/entity/entity-form/validators/range-validation';

export default {
pending_changes_text : T('There are unapplied network changes. Apply them now?\
 Unapplied changes will be lost.'),
pending_checkin_dialog_text : T('Network changes have been applied. Keep changes permanently?\
 Changes will be automatically discarded if they are not permanently applied.'),
pending_checkin_text : T('Network settings have been temporarily changed. They will be automatically discarded after'),
pending_checkin_text_2 : T('seconds unless KEEP CHANGES is chosen to make them permanent.'),
commit_changes_title: T("Apply Network Changes"),
commit_changes_warning: T("Apply network changes? Network connectivity will be interrupted."),
changes_saved_successfully: T("Network changes applied successfully."),
commit_button: T("APPLY CHANGES"),
keep_button: T("KEEP CHANGES"),
rollback_button: T("DISCARD CHANGES"),
rollback_changes_title: T("Discard Network Changes"),
rollback_changes_warning: T("Discard unapplied network changes?"),
changes_rolled_back: T("Network changes discarded."),

checkin_title: T("Keep Network Changes"),
checkin_message: T("Keep changed network settings permanently?"),
checkin_complete_title: T("Network Changes Made Permanent"),
checkin_complete_message: T("Network changes have been made permanent."),
checkin_button: T('KEEP NETWORK CHANGES PERMANENTLY'),

pending_changes_title: T("Pending Network Changes"),
pending_changes_message: T("There are unsaved network interface settings.  Review them now?"),

ha_enabled_edit_title: T("Cannot Edit while HA is Enabled"),
ha_enabled_edit_msg: T("Editing interfaces while HA is enabled is not allowed."),

ha_enabled_delete_title: T("Cannot Delete while HA is Enabled"),
ha_enabled_delete_msg: T("Deleting interfaces while HA is enabled is not allowed."),

checkin_text: T("Changes that have been applied will revert after "),
checkin_text_2: T(" seconds unless KEEP PERMANENTLY is chosen. Adjust the delay time to allow for testing."),

ha_enabled_text: T("Cannot edit while HA is enabled."),
go_to_ha: T("Go to HA settings"),

delete_dialog_text: T("Network connectivity will be interrupted. ")
}
