import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ManualSchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 1;
}

const schema = ManualSchema.create({}, true);

schema.prop1 = 100;
// Will calculated changes both for of prop1 and prop2
schema.updateIsValidAll();
