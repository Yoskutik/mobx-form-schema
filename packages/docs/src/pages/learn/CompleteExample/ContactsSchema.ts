import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { required, email } from './validators';

export class ContactsSchema extends FormSchema {
  @validate(required(), email())
  @watch email = '';

  @watch tel = '';
}
