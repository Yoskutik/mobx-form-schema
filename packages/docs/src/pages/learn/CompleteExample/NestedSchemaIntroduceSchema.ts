import { FormSchema, nestedSchema } from '@yoskutik/mobx-form-schema';

class NestedSchema extends FormSchema {
  prop1 = 1;
}

export class NestedSchemaIntroduceSchema extends FormSchema {
  // Just an alias for this:
  //  @validate(schema => !schema.isValid)
  //  @watch.schema
  //  @factory.schema(NestedSchema)
  //  @present(schema => schema.presentation)
  @nestedSchema(NestedSchema)
  nestedSchema = NestedSchema.create();
}
