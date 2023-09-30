import { FormSchema, nestedSchemasArray } from '@yoskutik/mobx-form-schema';

class NestedSchema extends FormSchema {
  prop1 = 1;
}

export class NestedSchemasArrayIntroduceSchema extends FormSchema {
  // Just an alias for this:
  //  @validate(schemas => schemas.some(schema => !schema.isValid))
  //  @watch.schemasArray
  //  @factory.schemasArray(NestedSchema)
  //  @present(schemas => schemas.map(schema => schema.presentation))
  @nestedSchemasArray(NestedSchema)
  nestedSchema = [NestedSchema.create()];
}
