import 'reflect-metadata';
import { FormSchema, factory } from '@yoskutik/mobx-react-mvvm';

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
});
