import { factory, FormSchema } from '@yoskutik/mobx-form-schema';

class NestedSchema extends FormSchema {
  prop1 = 1;
}

export class FactorySchema extends FormSchema {
  @factory.schema(NestedSchema)
  nestedSchema1 = NestedSchema.create();

  nestedSchema2 = NestedSchema.create();
}

const schema = FactorySchema.create({
  nestedSchema1: { prop1: 10 },
  nestedSchema2: { prop1: 10 },
});

console.log(schema.nestedSchema1 instanceof NestedSchema); // true
console.log(schema.nestedSchema2 instanceof NestedSchema); // false
