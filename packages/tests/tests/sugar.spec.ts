import { FormSchema, nestedSchema, nestedSchemasArray, validate, watch } from '@yoskutik/mobx-form-schema';
import { isObservableProp, reaction, runInAction } from 'mobx';

describe('Sugar functionality', () => {
  describe('Nested schema', () => {
    class NestedSchema extends FormSchema {
      @validate(field => field < 5)
      @watch field = 0;
    }

    class Schema extends FormSchema {
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
      expect(schema.isValid).toBeFalsy();

      runInAction(() => schema.schema.field++);
      expect(schema.isValid).toBeTruthy();
    });

    it('observation', () => {
      expect(schema.isChanged).toBeTruthy();
      expect(schema.schema.getInitial('field')).toEqual(4);

      schema.schema.reset();
      expect(schema.isChanged).toBeFalsy();
    });

    it('presentation', () => {
      expect(schema.presentation).toEqual({
        schema: { field: 4 },
      });
    });
  });

  describe('Nested schemas array', () => {
    class NestedSchema extends FormSchema {
      @validate(field => field < 5)
      @watch field = 0;
    }

    class Schema extends FormSchema {
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
      expect(schema.isValid).toBeFalsy();

      runInAction(() => schema.schema[0].field++);
      expect(schema.isValid).toBeTruthy();
    });

    it('observation', () => {
      expect(schema.isChanged).toBeTruthy();
      expect(schema.schema[0].getInitial('field')).toEqual(4);

      schema.schema[0].reset();
      expect(schema.isChanged).toBeFalsy();
    });

    it('presentation', () => {
      expect(schema.presentation).toEqual({
        schema: [{ field: 4 }],
      });
    });
  });

  describe('onInit', () => {
    it('Auto mode', () => {
      const afterInit = jest.fn();
      const reactionFn = jest.fn();

      class Schema extends FormSchema {
        @watch prop = 1;

        protected onInit() {
          expect(isObservableProp(this, 'prop')).toBeTruthy();
          reaction(() => this.prop, reactionFn);
          afterInit();
        }
      }

      const schema = Schema.create();

      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(0);

      runInAction(() => schema.prop++);
      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(1);

      runInAction(() => schema.prop++);
      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(2);
    });

    it('Manual mode', () => {
      const afterInit = jest.fn();
      const reactionFn = jest.fn();

      class Schema extends FormSchema {
        @watch prop = 1;

        protected onInit() {
          expect(isObservableProp(this, 'prop')).toBeTruthy();
          reaction(() => this.prop, reactionFn);
          afterInit();
        }
      }

      const schema = Schema.create({}, true);

      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(0);

      runInAction(() => schema.prop++);
      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(1);

      runInAction(() => schema.prop++);
      expect(afterInit).toBeCalledTimes(1);
      expect(reactionFn).toBeCalledTimes(2);
    });
  });
});
