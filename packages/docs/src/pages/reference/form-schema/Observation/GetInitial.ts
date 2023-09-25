import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class GetInitialSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 2;
}

const schema = GetInitialSchema.create();

runInAction(() => schema.prop1++);
console.log(schema.getInitial('prop1')); // 1
