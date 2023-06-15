import 'reflect-metadata';
import { ManualFormSchema, nestedSchema, nestedSchemasArray, validate, watch } from '@yoskutik/manual-form-schema';

describe('Sugar validators', () => {
  describe('Nested schema', () => {
    class NestedSchema extends ManualFormSchema {
      @validate(field => field < 5)
      @watch field = 0;
    }

    class Schema extends ManualFormSchema {
      @nestedSchema(NestedSchema)
      schema = NestedSchema.create();
    }

    let schema: Schema;

    it('Initialization', () => {
      schema = Schema.create({
        schema: { field: 4 },
      });

      expect(schema.schema).toBeInstanceOf(NestedSchema);
      expect(schema.schema.field).toEqual(4);
    });

    it('validation', () => {
      schema.schema.validate();
      schema.validate();
      expect(schema.isValid).toBeFalsy();

      schema.schema.field++;
      schema.schema.validate();
      schema.validate();
      expect(schema.isValid).toBeTruthy();
    });

    it('observation', () => {
      schema.schema.checkChanges();
      schema.checkChanges();
      expect(schema.isChanged).toBeTruthy();
      expect(schema.schema.getInitial('field')).toEqual(4);

      schema.schema.reset();
      schema.schema.checkChanges();
      schema.checkChanges();
      expect(schema.isChanged).toBeFalsy();
    });

    it('presentation', () => {
      expect(schema.presentation).toEqual({
        schema: { field: 4 },
      });
    });
  });

  describe('Nested schemas array', () => {
    class NestedSchema extends ManualFormSchema {
      @validate(field => field < 5)
      @watch field = 0;
    }

    class Schema extends ManualFormSchema {
      @nestedSchemasArray(NestedSchema)
      schema = [NestedSchema.create()];
    }

    let schema: Schema;

    it('Initialization', () => {
      schema = Schema.create({
        schema: [{ field: 4 }],
      });

      expect(schema.schema[0]).toBeInstanceOf(NestedSchema);
      expect(schema.schema[0].field).toEqual(4);
    });

    it('validation', () => {
      schema.schema[0].validate();
      schema.validate();
      expect(schema.isValid).toBeFalsy();

      schema.schema[0].field++;
      schema.schema[0].validate();
      schema.validate();
      expect(schema.isValid).toBeTruthy();
    });

    it('observation', () => {
      schema.schema[0].checkChanges();
      schema.checkChanges();
      expect(schema.isChanged).toBeTruthy();
      expect(schema.schema[0].getInitial('field')).toEqual(4);

      schema.schema[0].reset();
      schema.schema[0].checkChanges();
      schema.checkChanges();
      expect(schema.isChanged).toBeFalsy();
    });

    it('presentation', () => {
      expect(schema.presentation).toEqual({
        schema: [{ field: 4 }],
      });
    });
  });
});