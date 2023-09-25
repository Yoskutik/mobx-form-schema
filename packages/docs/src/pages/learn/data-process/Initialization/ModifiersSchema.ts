import { factory, FormSchema } from '@yoskutik/mobx-form-schema';

class NestedSchema extends FormSchema {
  prop1 = 1;
}

export class ModifiersSchema extends FormSchema {
  @factory.set
  set: Set<number> | undefined = undefined;

  @factory.schema(NestedSchema)
  nestedSchema: NestedSchema | undefined = undefined;

  @factory.schemasArray(NestedSchema)
  nestedSchemasArray: NestedSchema[] | undefined = undefined;
}
