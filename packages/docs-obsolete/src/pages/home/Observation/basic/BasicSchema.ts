import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class BasicSchema extends FormSchema {
  @watch name = '';

  @watch surname = '';

  @watch email = '';
}