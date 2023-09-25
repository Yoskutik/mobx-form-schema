import { FormSchema, nestedSchema } from '@yoskutik/mobx-form-schema';

class NestedSchema extends FormSchema {
  prop1 = 1;
}

export class NestedSchemaSchema extends FormSchema {
  // Just an alias for this:
  //  @validate(schema => !schema.isValid)
  //  @watch.schema
  //  @factory.schema(NestedSchema)
  //  @presentation(schema => schema.presentation)
  @nestedSchema(NestedSchema)
  prop1 = NestedSchema.create();
}
