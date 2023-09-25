import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class BasicSchema extends FormSchema {
  @watch name = 'Joe';

  @watch surname = 'Dough';
}
