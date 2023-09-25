import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

class NestedSchema extends FormSchema {
  @watch prop = 1;
}

export class WatchSchema extends FormSchema {
  @watch.schemasArray nestedSchemas = [NestedSchema.create()];
}

const schema = WatchSchema.create();
console.log(schema.isChanged); // false

runInAction(() => schema.nestedSchemas[0].prop++);
console.log(schema.isChanged); // true

runInAction(() => schema.nestedSchemas[0].prop--);
console.log(schema.isChanged); // false

runInAction(() => schema.nestedSchemas = [NestedSchema.create({ prop: 1 })]);
console.log(schema.isChanged); // false
