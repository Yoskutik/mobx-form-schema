import 'reflect-metadata';
import { ManualFormSchema, watch } from '@yoskutik/manual-form-schema';

describe('watch.set decorator', () => {
  class Schema extends ManualFormSchema {
    @watch.set set = new Set([12]);
  }

  const schema = Schema.create();

  it('Should be changed if set\'s contest is changed', () => {
    schema.set.add(123);
    schema.checkChanges();
    expect(schema.isChanged).toEqual(true);
  });

  it('Should be not changed if set\'s contest became the same', () => {
    schema.set.delete(123);
    schema.checkChanges();
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed with a new set with the same contest', () => {
    schema.set = new Set([12]);
    schema.checkChanges();
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    schema.set.add(123);
    schema.reset();
    schema.checkChanges();
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after syncing changed state', () => {
    schema.set.add(123);
    schema.sync();
    schema.checkChanges();
    expect(schema.isChanged).toEqual(false);
  });

  it('By default applies observable.shallow', () => {
    const obj = { a: 1 };
    class Schema extends ManualFormSchema {
      @watch.set arr = new Set([obj]);
    }

    const schema = Schema.create();

    obj.a++;
    schema.checkChanges();
    expect(schema.isChanged).toEqual(false);
  });
});
