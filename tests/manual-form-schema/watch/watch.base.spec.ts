import 'reflect-metadata';
import { ManualFormSchema, watch } from '@yoskutik/manual-form-schema';

describe('watch decorator', () => {
  it('getInitial', () => {
    class Schema extends ManualFormSchema {
      @watch field1 = 1;
    }

    const schema = Schema.create();
    expect(schema.field1).toEqual(1);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(false);

    schema.field1 = 2;
    schema.checkChanges();
    expect(schema.field1).toEqual(2);
    expect(schema.getInitial('field1')).toEqual(1);
    expect(schema.isChanged).toEqual(true);
  });

  describe('methods', () => {
    it('sync', () => {
      class Schema extends ManualFormSchema {
        @watch field = 1;
      }

      const schema = Schema.create();
      expect(schema.getInitial('field')).toEqual(1);
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      schema.checkChanges();
      expect(schema.getInitial('field')).toEqual(1);
      expect(schema.isChanged).toEqual(true);

      schema.sync();
      schema.checkChanges();
      expect(schema.getInitial('field')).toEqual(2);
      expect(schema.isChanged).toEqual(false);
    });

    it('reset', () => {
      class Schema extends ManualFormSchema {
        @watch field = 1;
      }

      const schema = Schema.create();
      expect(schema.isChanged).toEqual(false);

      schema.field++;
      schema.checkChanges();
      expect(schema.isChanged).toEqual(true);

      schema.reset();
      schema.checkChanges();
      expect(schema.field).toEqual(1);
      expect(schema.isChanged).toEqual(false);
    });
  });
});
