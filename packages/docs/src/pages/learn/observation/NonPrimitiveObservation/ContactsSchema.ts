import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ContactsSchema extends FormSchema {
  @watch email = 'joe.dough@any.com';

  @watch tel = '';
}
