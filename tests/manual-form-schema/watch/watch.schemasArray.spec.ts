import 'reflect-metadata';
import { ManualFormSchema, watch } from '@yoskutik/manual-form-schema';

describe('watch.schemasArray decorator', () => {
  class Schema1 extends ManualFormSchema {
    @watch field1 = 1;
  }

  class Schema2 extends ManualFormSchema {
    @watch.schemasArray schemas = [Schema1.create()];
  }

  const schema2 = Schema2.create();

  afterEach(() => {
    expect(schema2.schemas.every(it => it instanceof Schema1)).toEqual(true);
  });

  it('Should be changed if a single schema is changed', () => {
    schema2.schemas[0].field1++;
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if a single schema became the same', () => {
    schema2.schemas[0].field1--;
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be changed if a new schema is added', () => {
    schema2.schemas.push(Schema1.create());
    schema2.schemas[0].checkChanges();
    schema2.schemas[1].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(true);
  });

  it('Should be not changed if schema is deleted', () => {
    schema2.schemas.pop();
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed with a new schema array with the same contest', () => {
    schema2.schemas = [Schema1.create()];
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    schema2.schemas[0].field1++;
    schema2.reset();
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
    expect(schema2.schemas[0].field1).toEqual(1);
  });

  it('Should be not changed after syncing changed state', () => {
    schema2.schemas[0].field1++;
    schema2.sync();
    schema2.schemas[0].checkChanges();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);
  });

  it('Saving and restoring nullish values', () => {
    schema2.schemas = undefined;
    schema2.sync();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);

    schema2.schemas = [Schema1.create()];

    schema2.reset();
    schema2.checkChanges();
    expect(schema2.isChanged).toEqual(false);

    schema2.schemas = [Schema1.create()];
  });
});
