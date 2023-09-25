import { factory, FormSchema } from '@yoskutik/mobx-form-schema';

export class FactorySchema extends FormSchema {
  @factory.set // same as @factory(data => new Set(data))
  prop1 = new Set([1, 2, 3]);

  prop2 = new Set([1, 2, 3]);
}

const schema = FactorySchema.create({
  prop1: [1, 2, 3],
  prop2: [1, 2, 3],
});

console.log(schema.prop1, schema.prop2);
// Set([1, 2, 3]), [1, 2, 3]
