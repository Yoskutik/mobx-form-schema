import { factory, FormSchema, watch } from '@yoskutik/form-schema';

class NestedSchema extends FormSchema {
  @watch field = '';
}

export class ObservationSchema extends FormSchema {
  @watch field = '';

  @watch.array array: string[] = [];

  @watch.set set = new Set<string>();

  @factory.schema(NestedSchema)
  @watch.schema nestedSchema = NestedSchema.create();
}