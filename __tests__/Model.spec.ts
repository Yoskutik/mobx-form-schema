import 'reflect-metadata';
import { deepComparator, field, Model, validate } from '@yoskutik/mobx-react-mvvm';
import { makeObservable, observable, configure as configureMobx } from 'mobx';

configureMobx({ enforceActions: 'never' });

const required = () => (value: string) => !value ? 'Must be defined' : false;

describe('Model checking', () => {
  describe('@validate', () => {
    test('Validators', () => {
      const lengthSize = (min: number, max: number) => (value: string) => {
        if (value.length < min) return `The value must have at least ${min} chars`;
        if (value.length > max) return `The value must have maximum ${max} chars`;
        return false;
      };
      const not = (badValue: string) => (value: string) => value === badValue ? `The value should not be ${badValue}` : false;

      class SomeModel extends Model {
        @validate(required(), lengthSize(3, 6), not('asd'))
        @observable field: string = undefined;

        constructor() {
          super();
          makeObservable(this);
        }
      }

      const model = SomeModel.create({ field: '' });
      expect(model.errors.field).toEqual('Must be defined');

      model.field = 'aa';
      expect(model.errors.field).toEqual('The value must have at least 3 chars');

      model.field = 'aaaaaaa';
      expect(model.errors.field).toEqual('The value must have maximum 6 chars');

      model.field = 'asd';
      expect(model.errors.field).toEqual('The value should not be asd');

      model.field = 'asd1';
      expect(model.errors.field).toBeFalsy();
    });

    test('Extended configuration', () => {
      class SomeModel extends Model {
        @validate({
          preprocess: value => value?.trim(),
          validators: [required()],
          shouldCheckValidity: record => record.shouldCheckValidity,
        })
        @observable field: string = undefined;

        shouldCheckValidity = true;

        constructor() {
          super();
          makeObservable(this);
        }
      }

      const model = SomeModel.create();
      expect(model.errors.field).toEqual('Must be defined');
      model.field = '  ';
      expect(model.errors.field).toEqual('Must be defined');
      expect(model.isValid).toBeFalsy();
      model.field = 'a';
      expect(model.errors.field).toBeFalsy();

      model.shouldCheckValidity = false;
      model.field = '';
      expect(model.errors.field).toBeFalsy();
      expect(model.isValid).toBeTruthy();
    });
  });

  describe('@field', () => {
    test('isChanged mechanism', () => {
      class SomeModel extends Model {
        @field() @observable field: string = undefined;

        @field() @observable field1: string = undefined;

        @observable field2: string = undefined;

        constructor() {
          super();
          makeObservable(this);
        }
      }

      const model = SomeModel.create({ field: 'field', field1: 'field1', field2: 'field2' });
      expect(model.field1).toEqual('field1');
      expect(model.isChanged).toBeFalsy();

      model.field = 'aa';
      expect(model.isChanged).toBeTruthy();
      expect(model.getInitial('field')).toEqual('field');
      expect(model.getInitial('field1')).toBeFalsy();

      model.field1 = 'aa';
      expect(model.isChanged).toBeTruthy();
      expect(model.getInitial('field')).toEqual('field');
      expect(model.getInitial('field1')).toEqual('field1');

      model.field = 'field';
      model.field1 = 'field1';
      expect(model.isChanged).toBeFalsy();
      expect(model.getInitial('field')).toBeFalsy();
      expect(model.getInitial('field1')).toBeFalsy();

      model.field2 = 'aa';
      expect(model.isChanged).toBeFalsy();

      model.field = 'aa';
      model.field1 = 'aa';
      model.commit();
      expect(model.isChanged).toBeFalsy();
    });

    test('Preprocessing and default values', () => {
      class SomeModel extends Model {
        @field({ watch: false }) field = 'field';

        @field({ watch: false, factory: record => (record?.field1 || '') + '>postfix' }) field1 = 'field1';
      }

      let model = SomeModel.create();
      expect(model.field).toEqual('field');
      expect(model.field1).toEqual('>postfix');

      model = SomeModel.create({ field: 'a', field1: 'b' });
      expect(model.field).toEqual('a');
      expect(model.field1).toEqual('b>postfix');
    });

    test('Comparators', () => {
      class SomeModel extends Model {
        @field({ comparator: deepComparator() })
        @observable.shallow field = [1, 2];

        @field({ comparator: deepComparator() })
        @observable.ref field2 = {
            a: 1,
            b: 2,
          };

        @field({ comparator: (prevValue, value) => value > prevValue })
        @observable field3 = 5;

        constructor() {
          super();
          makeObservable(this);
        }
      }

      const model = SomeModel.create();
      expect(model.isChanged).toBeFalsy();

      model.field = [1, 2, 3];
      expect(model.isChanged).toBeTruthy();

      model.field = [1, 2];
      expect(model.isChanged).toBeFalsy();

      model.field2 = { a: 2, b: 2 };
      expect(model.isChanged).toBeTruthy();

      model.field2 = { a: 1, b: 2 };
      expect(model.isChanged).toBeFalsy();

      model.field3 = 7;
      expect(model.isChanged).toBeFalsy();

      model.field3 = 3;
      expect(model.isChanged).toBeTruthy();
    });

    test('State', () => {
      class SomeModel extends Model {
        @field()
        @observable field = 'field';

        field2 = 2;

        constructor() {
          super();
          makeObservable(this);
        }
      }

      const state = SomeModel.create().state;

      expect(state.field).toEqual('field');
      expect(state.field2).toEqual(2);
      expect(Object.keys(state)).toHaveLength(2);
    });

    test('Labels', () => {
      class SomeModel extends Model {
        @field({ watch: false, label: 'Field label' }) field = 0;

        @field({ watch: false, label: 'Field 1 label' }) field1 = 0;
      }

      let model = SomeModel.create();
      expect(model.labels.field).toEqual('Field label');
      expect(model.labels.field1).toEqual('Field 1 label');

      class SomeModel2 extends Model {
        @field({ watch: false }) field = 0;

        @field({ watch: false }) field1 = 0;
      }

      model = SomeModel2.create();
      expect(model.labels).toBeFalsy();
    });
  });
});
