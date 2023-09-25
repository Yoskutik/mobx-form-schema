import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';

export class ManualSchema extends FormSchema {
  @validate(value => value > 10)
  @watch prop1 = 1;

  @validate(value => value > 20)
  @watch prop2 = 1;
}

const schema = ManualSchema.create({}, true);

schema.prop1 = 100;
schema.prop2 = -100;
// Will update schema.errors.prop1, schema.errors.prop2 and schema.isValid
schema.updateIsValidAll();
