import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class ContactsSchema extends FormSchema {
  @watch email = '';

  @watch tel = '';
}

export class RelativeSchema extends FormSchema {
  @watch name = '';

  @watch surname = '';
}

export class NestedSchemasSchema extends FormSchema {
  @watch.schema contacts = ContactsSchema.create();

  @watch.schemasArray relatives: RelativeSchema[] = [];
}