import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class WatchSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 2;
}

const schema = WatchSchema.create();
console.log(schema.isChanged, schema.changedProperties); // false, Set([])

runInAction(() => schema.prop1++);
console.log(schema.isChanged, schema.changedProperties); // true, Set(['prop1'])

runInAction(() => schema.prop2++);
console.log(schema.isChanged, schema.changedProperties); // true, Set(['prop1', 'prop2'])

runInAction(() => schema.prop1--);
console.log(schema.isChanged, schema.changedProperties); // true, Set(['prop2'])
