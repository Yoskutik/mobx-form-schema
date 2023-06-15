import 'reflect-metadata';
import { ManualFormSchema, watch } from '@yoskutik/manual-form-schema';

describe('watch.array decorator', () => {
  class Schema extends ManualFormSchema {
    @watch.array arr = [12];
  }

  const schema = Schema.create();

  it('Should be changed if array\'s contest is changed', () => {
    schema.arr.push(123);
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(true);
  });

  it('Should be not changed if array\'s contest became the same', () => {
    schema.arr.pop();
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed with a new array with the same contest', () => {
    schema.arr = [12];
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    schema.arr.push(123);
    schema.reset();
    schema.checkChanges('arr');
    expect(schema.arr).toEqual([12]);
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after syncing changed state', () => {
    schema.arr.push(123);
    schema.sync();
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(false);
  });

  it('By default applies observable.shallow', () => {
    class Schema extends ManualFormSchema {
      @watch.array arr = [{ a: 1 }];
    }

    const schema = Schema.create();

    schema.arr[0].a++;
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(false);

    schema.arr[0] = { a: 1 };
    schema.checkChanges('arr');
    expect(schema.isChanged).toEqual(true);
  });
});
