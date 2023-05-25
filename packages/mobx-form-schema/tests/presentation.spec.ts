import 'reflect-metadata';
import { FormSchema, presentation } from '@yoskutik/mobx-react-mvvm';

describe('presentation decorator', () => {
  it('Presentation without decorator', () => {
    class Schema extends FormSchema {
      field1 = 1;

      field2 = 2;
    }

    const schema = Schema.create();

    expect(schema.presentation).toEqual({ field1: 1, field2: 2 });
  });

  it('Presentation with decorator', () => {
    class Schema extends FormSchema {
      @presentation(() => undefined)
      field1 = 1;

      @presentation((value) => value.toString())
      field2 = 2;

      @presentation((_value, schema: Schema) => schema.field2 + 10)
      field3 = 3;

      field4 = 4;
    }

    const schema = Schema.create();

    expect(schema.presentation).toEqual({
      field1: undefined,
      field2: '2',
      field3: 12,
      field4: 4,
    });
  });
});
