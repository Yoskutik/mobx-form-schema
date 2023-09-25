import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class ChangedPropertiesSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 2;
}

const schema = ChangedPropertiesSchema.create();

runInAction(() => schema.prop1++);
console.log(schema.changedProperties); // Set(['prop1']

runInAction(() => schema.prop2++);
console.log(schema.changedProperties); // Set(['prop1', 'prop2']

runInAction(() => schema.prop1--);
console.log(schema.changedProperties); // Set(['prop2']
