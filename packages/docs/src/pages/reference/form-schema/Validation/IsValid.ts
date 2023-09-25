import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { reaction } from 'mobx';

const prop1 = () => (value: number) => {
  if (value > 10) return false;
  return 'Prop1 must be greater than 10';
};

export class IsValidSchema extends FormSchema {
  @validate(prop1())
  @watch prop1 = 1;

  protected onInit() {
    reaction(() => this.isValid, value => {
      console.log('The schema is', value ? 'valid' : 'not valid');
    });
  }
}
