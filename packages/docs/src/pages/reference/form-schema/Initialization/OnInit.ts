import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { reaction } from 'mobx';

export class OnInitSchema extends FormSchema {
  @validate((prop1: number) => prop1 > 10)
  @watch prop1 = 1;

  @watch prop2 = 2;

  protected onInit() {
    reaction(() => this.prop1, () => {
      console.log('prop1 is changed');
    });

    reaction(() => !this.errors.prop1, isValid => {
      console.log('prop1 is', isValid ? 'valid' : 'not valid');
    });
  }
}
