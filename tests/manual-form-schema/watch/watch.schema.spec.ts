import 'reflect-metadata';
import { ManualFormSchema, watch } from '@yoskutik/manual-form-schema';

describe('watch.schema decorator', () => {
  class Schema1 extends ManualFormSchema {
    @watch field1 = 1;
  }

  class Schema2 extends ManualFormSchema {
    @watch.schema schema1 = Schema1.create();
  }

  const schema2 = Schema2.create();

  afterEach(() => {
    expect(!schema2.schema1 || schema2.schema1 instanceof Schema1).toBeTruthy();
  });

  it('Should be changed if schema\'s contest is changed', () => {
    schema2.schema1.field1++;
    schema2.schema1.checkChanges();
    schema2.checkChanges('schema1');
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if schema\'s contest became the same', () => {
    schema2.schema1.field1--;
    schema2.schema1.checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with a new schema with the same contest', () => {
    schema2.schema1 = Schema1.create();
    schema2.schema1.checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with if became undefined', () => {
    schema2.schema1 = undefined;
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed with if became defined', () => {
    schema2.schema1 = Schema1.create();
    schema2.schema1.checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    schema2.schema1.field1++;
    schema2.reset();
    schema2.schema1.checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
    expect(schema2.schema1.isChanged).toEqual(false);
    expect(schema2.schema1.field1).toEqual(1);
  });

  it('Should be not changed after syncing changed state', () => {
    schema2.schema1.field1++;
    schema2.sync();
    schema2.schema1.checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  describe('second level nested schemas', () => {
    class Schema3 extends ManualFormSchema {
      @watch.schema schema2 = Schema2.create();
    }

    const schema3 = Schema3.create();

    it('Should be changed if schema\'s contest is changed', () => {
      schema3.schema2.schema1 = Schema1.create({ field1: 5 });
      schema3.schema2.schema1.checkChanges();
      schema3.schema2.checkChanges();
      schema3.checkChanges();
      expect(schema3.isChanged).toEqual(true);
    });

    it('Should be changed if schema\'s contest is the same', () => {
      schema3.schema2.schema1 = Schema1.create();
      schema3.schema2.schema1.checkChanges();
      schema3.schema2.checkChanges();
      schema3.checkChanges();
      expect(schema3.isChanged).toEqual(false);
    });

    it('Should be changed if schema\'s contest is changed2', () => {
      schema3.schema2 = Schema2.create({ schema1: Schema1.create({ field1: 5 }) });
      schema3.schema2.schema1.checkChanges();
      schema3.schema2.checkChanges();
      schema3.checkChanges();
      expect(schema3.isChanged).toEqual(true);
    });

    it('Should be changed if schema\'s contest is the same2', () => {
      schema3.schema2 = Schema2.create();
      schema3.schema2.schema1.checkChanges();
      schema3.schema2.checkChanges();
      schema3.checkChanges();
      expect(schema3.isChanged).toEqual(false);
    });
  });
});
