import { FormSchema, presentation } from '@yoskutik/mobx-form-schema';

describe('presentation decorator', () => {
  it('Presentation without decorator', () => {
    class Schema extends FormSchema {
      field1 = 1;

      field2 = 2;
    }

    const schema = Schema.create();

    expect(schema.presentation).toEqual({ field1: 1, field2: 2 });
  });

  describe('Presentation with decorator', () => {
    it('As factories', () => {
      class Schema extends FormSchema {
        @presentation(() => 'completely new field1')
        field1 = 1;

        @presentation(value => value.toString())
        field2 = 2;

        @presentation((_value, schema: Schema) => schema.field2 + 10)
        field3 = 3;

        field4 = 4;
      }

      const schema = Schema.create();

      expect(schema.presentation).toEqual({
        field1: 'completely new field1',
        field2: '2',
        field3: 12,
        field4: 4,
      });
    });

    it('presentation.hidden', () => {
      class Schema extends FormSchema {
        @presentation.hidden
        field1 = 1;

        field2 = 2;
      }

      const schema = Schema.create();

      expect(schema.presentation).toEqual({ field2: 2 });
      expect('field1' in schema.presentation).toBeFalsy();
    });
  });
});
