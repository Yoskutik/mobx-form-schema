import { FormSchema, presentation } from '@yoskutik/mobx-form-schema';

const presentProp1 = (prop1Value: number) => prop1Value + 10;

const presentProp2 = (prop2Value: number, schema: PresentationSchema) => (
  prop2Value + schema.prop1 * 10
);

export class PresentationSchema extends FormSchema {
  @presentation(presentProp1)
  prop1 = 1;

  @presentation(presentProp2)
  prop2 = 2;

  prop3 = 3;
}

const schema = PresentationSchema.create();

console.log(schema.presentation);
// { prop1: 11, prop2: 12, prop3: 3 }
