import { FormSchema, present } from '@yoskutik/mobx-form-schema';

export class PresentationSchema extends FormSchema {
  @present.hidden
  prop1 = 1;

  prop2 = 2;
}

const schema = PresentationSchema.create();

console.log(schema.presentation);
// { prop2: 2 }
