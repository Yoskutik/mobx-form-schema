import { FormSchema } from '@yoskutik/mobx-form-schema';

export class CreateSchema extends FormSchema {
  prop1 = 'default value';

  prop2 = 2;
}

const schema = CreateSchema.create({
  prop2: 3033,
  // can't pass 'prop3' since, CreateSchema doesn't contain such property
});

console.log(schema.prop1); // 'default value'
console.log(schema.prop2); // 3033
