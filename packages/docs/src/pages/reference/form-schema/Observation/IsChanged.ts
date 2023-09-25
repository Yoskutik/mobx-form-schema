import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { reaction } from 'mobx';

export class IsChangedSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 2;

  protected onInit() {
    reaction(() => this.isChanged, value => {
      console.log('The schema is', value ? 'changed' : 'not changed');
    });
  }
}
