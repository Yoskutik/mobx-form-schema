import { FormSchema, watch } from '@yoskutik/mobx-form-schema';

export class ManualPropertySchema extends FormSchema {
  @watch prop1 = 1;

  @watch prop2 = 1;
}

const schema = ManualPropertySchema.create({}, true);

schema.prop1 = 100;
// Will calculated changes only of prop1 property
schema.updateIsPropertyChanged('prop1');
