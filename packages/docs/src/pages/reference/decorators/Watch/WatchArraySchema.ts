import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class WatchSchema extends FormSchema {
  @watch.array array = [1, 2, 3];
}

const schema = WatchSchema.create();
console.log(schema.isChanged); // false

runInAction(() => schema.array.push(4));
console.log(schema.isChanged); // true

runInAction(() => schema.array.pop());
console.log(schema.isChanged); // false

runInAction(() => schema.array = [1, 2, 3]);
console.log(schema.isChanged); // false
