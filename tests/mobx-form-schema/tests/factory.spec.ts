import 'reflect-metadata';
import { FormSchema, factory } from '@yoskutik/mobx-form-schema';

describe('factory decorator', () => {
  it('Data shouldn\'t be changed without factory', () => {
    class Schema extends FormSchema {
      field1 = 1;

      field2 = 2;
    }

    const schema = Schema.create();

    expect(schema.field1).toEqual(1);
    expect(schema.field1).toEqual(1);
  });

  it('Data shouldn\'t be changed with factory', () => {
    class Schema extends FormSchema {
      @factory(() => 123)
      field1 = 1;

      field2 = 2;

      field3 = 50;
    }

    const schema = Schema.create({ field2: 100 });

    expect(schema.field1).toEqual(123);
    expect(schema.field2).toEqual(100);
    expect(schema.field3).toEqual(50);
  });

  it('Data must be changed with factory', () => {
    class Schema extends FormSchema {
      @factory(() => 123)
      field1 = 1;

      @factory((field2) => field2 + 100)
      field2 = 2;

      @factory((_, { field1 }) => field1 + 50)
      field3 = 50;
    }

    const schema = Schema.create({
      field1: 1,
      field2: 2,
      field3: 3,
    });

    expect(schema.field1).toEqual(123);
    expect(schema.field2).toEqual(102);
    expect(schema.field3).toEqual(51);
  });

  describe('Set factory', () => {
    class Schema extends FormSchema {
      @factory.set set = new Set([1, 2]);
    }

    it('Default value', () => {
      const schema = Schema.create();

      expect(schema.set).toBeInstanceOf(Set);
      expect(schema.set).toEqual(new Set([1, 2]));
    });

    it('Pre-filled value', () => {
      const schema = Schema.create({
        set: [1, 2, 3],
      });

      expect(schema.set).toBeInstanceOf(Set);
      expect(schema.set).toEqual(new Set([1, 2, 3]));
    });
  });

  describe('Nested schema factory', () => {
    class NestedSchema extends FormSchema {
      field = 0;
    }

    class Schema extends FormSchema {
      @factory.forSchema(NestedSchema)
      schema = NestedSchema.create();
    }

    it('Default value', () => {
      const schema = Schema.create();

      expect(schema.schema).toBeInstanceOf(NestedSchema);
      expect(schema.schema.field).toEqual(0);
    });

    it('Pre-filled value', () => {
      const schema = Schema.create({
        schema: { field: 123 },
      });

      expect(schema.schema).toBeInstanceOf(NestedSchema);
      expect(schema.schema.field).toEqual(123);

      const schema2 = Schema.create({
        schema: null,
      });

      expect(schema2.schema).toBeNull();
    });
  });

  describe('Nested schemas array factory', () => {
    class NestedSchema extends FormSchema {
      field = 0;
    }

    class Schema extends FormSchema {
      @factory.forSchemasArray(NestedSchema)
      schemas = [NestedSchema.create()];
    }

    it('Default value', () => {
      const schema = Schema.create();

      expect(schema.schemas).toHaveLength(1);
      expect(schema.schemas[0]).toBeInstanceOf(NestedSchema);
      expect(schema.schemas[0].field).toEqual(0);
    });

    it('Pre-filled value', () => {
      const schema = Schema.create({
        schemas: [
          { field: 10 },
          { field: 20 },
        ],
      });

      expect(schema.schemas[0]).toBeInstanceOf(NestedSchema);
      expect(schema.schemas[0].field).toEqual(10);
      expect(schema.schemas[1]).toBeInstanceOf(NestedSchema);
      expect(schema.schemas[1].field).toEqual(20);

      const schema2 = Schema.create({
        schemas: null,
      });

      expect(schema2.schemas).toBeNull();
    });
  });
});
