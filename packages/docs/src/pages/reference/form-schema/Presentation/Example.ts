import { FormSchema, present } from '@yoskutik/mobx-form-schema';

export class Example1 extends FormSchema {
  prop1 = 1;

  prop2 = 2;
}

const schema1 = Example1.create();
console.log(schema1.presentation);
// { prop1: 1, prop2: 2 }

export class Example2 extends FormSchema {
  @present(prop1 => prop1 * 100)
  prop1 = 1;

  @present.hidden
  prop2 = 2;
}

const schema2 = Example2.create();
console.log(schema2.presentation);
// { prop1: 100 }
