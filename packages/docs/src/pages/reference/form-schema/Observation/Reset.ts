import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class ResetSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 2;
}

const schema = ResetSchema.create();

runInAction(() => schema.prop1++);
console.log(schema.isChanged, schema.prop1, schema.getInitial('prop1'));
// true, 2, 1

schema.reset();
console.log(schema.isChanged, schema.prop1, schema.getInitial('prop1'));
// false, 1, 1
