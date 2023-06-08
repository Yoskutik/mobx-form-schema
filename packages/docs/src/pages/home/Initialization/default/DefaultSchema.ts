import { FormSchema } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';

export class DefaultSchema extends FormSchema {
  @observable field1 = 'Default value 1';

  @observable field2 = 'Default value 2';
}