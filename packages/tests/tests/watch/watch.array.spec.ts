import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { runInAction } from 'mobx';

describe('watch.array decorator', () => {
  class Schema extends FormSchema {
    @watch.array arr = [12];
  }

  const schema = Schema.create();

  it('Should be changed if array\'s contest is changed', () => {
    runInAction(() => schema.arr.push(123));
    expect(schema.isChanged).toEqual(true);
  });

  it('Should be not changed if array\'s contest became the same', () => {
    runInAction(() => schema.arr.pop());
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed with a new array with the same contest', () => {
    runInAction(() => schema.arr = [12]);
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after resetting changed state', () => {
    runInAction(() => schema.arr.push(123));
    schema.reset();
    expect(schema.arr).toEqual([12]);
    expect(schema.isChanged).toEqual(false);
  });

  it('Should be not changed after syncing changed state', () => {
    runInAction(() => schema.arr.push(123));
    schema.sync();
    expect(schema.isChanged).toEqual(false);
  });

  it('By default applies observable.shallow', () => {
    class SchemaArray extends FormSchema {
      @watch.array arr = [{ a: 1 }];
    }

    const schemaArray = SchemaArray.create();

    runInAction(() => schemaArray.arr[0].a++);
    expect(schemaArray.isChanged).toEqual(false);

    runInAction(() => schemaArray.arr[0] = { a: 1 });
    expect(schemaArray.isChanged).toEqual(true);
  });

  it('Manual observation', () => {
    class ManualSchema extends FormSchema {
      @watch.array arr = [12];
    }

    const manualSchema = ManualSchema.create({}, true);

    runInAction(() => manualSchema.arr.pop());
    expect(manualSchema.isChanged).toEqual(false);

    manualSchema.updateIsPropertyChanged('arr');
    expect(manualSchema.isChanged).toEqual(true);

    manualSchema.arr.push(12);
    expect(manualSchema.isChanged).toEqual(true);

    manualSchema.updateIsChangedAny();
    expect(manualSchema.isChanged).toEqual(false);
  });
});
