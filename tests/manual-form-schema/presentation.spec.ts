import 'reflect-metadata';
import { ManualFormSchema, presentation } from '@yoskutik/manual-form-schema';

describe('presentation decorator', () => {
  it('Presentation without decorator', () => {
    class Schema extends ManualFormSchema {
      field1 = 1;

      field2 = 2;
    }

    const schema = Schema.create();

    expect(schema.presentation).toEqual({ field1: 1, field2: 2 });
  });

  describe('Presentation with decorator', () => {
    it('As factories', () => {
      class Schema extends ManualFormSchema {
        @presentation(() => 'completely new field1')
        field1 = 1;

        @presentation((value) => value.toString())
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
      class Schema extends ManualFormSchema {
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
