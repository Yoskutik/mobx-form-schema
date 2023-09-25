import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

export class WatchSchema extends FormSchema {
  @watch.set array = new Set([1, 2, 3]);
}

const schema = WatchSchema.create();
console.log(schema.isChanged); // false

runInAction(() => schema.array.add(4));
console.log(schema.isChanged); // true

runInAction(() => schema.array.delete(4));
console.log(schema.isChanged); // false

runInAction(() => schema.array = new Set([1, 2, 3]));
console.log(schema.isChanged); // false
