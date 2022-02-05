import 'reflect-metadata';
import {field, Model, validate} from "@yoskutik/mobx-react-mvvm";
import {makeObservable, observable, configure as configureMobx} from "mobx";

configureMobx({ enforceActions: "never" });

const required = () => (value: string) => !value ? 'Must be defined' : false;

describe('Model checking', () => {
    test('Validate mechanism check', () => {
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

    test('Validate preprocess check', () => {
        class SomeModel extends Model {
            @validate({
                preprocess: value => value?.trim(),
                validators: [required()],
                shouldCheckValidity: record => record.shouldCheckValidity
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

    test('Dirty mechanism check', () => {
        class SomeModel extends Model {
            @field() @observable field: string = undefined;

            @field({ label: 'Label', factory: record => record.field1 + '1' }) @observable field1: string = undefined;

            @observable field2: string = undefined;

            constructor() {
                super();
                makeObservable(this);
            }
        }

        const model = SomeModel.create({ field: 'field', field1: 'field1', field2: 'field2' });
        expect(model.field1).toEqual('field11');
        expect(model.isDirty).toBeFalsy();
        expect(model.labels?.field1).toEqual('Label')

        model.field = 'aa';
        expect(model.isDirty).toBeTruthy();
        expect(model.getInitial('field')).toEqual('field');
        expect(model.getInitial('field1')).toBeFalsy();

        model.field1 = 'aa';
        expect(model.isDirty).toBeTruthy();
        expect(model.getInitial('field')).toEqual('field');
        expect(model.getInitial('field1')).toEqual('field11');

        model.field = 'field';
        model.field1 = 'field11';
        expect(model.isDirty).toBeFalsy();
        expect(model.getInitial('field')).toBeFalsy();
        expect(model.getInitial('field1')).toBeFalsy();

        model.field2 = 'aa';
        expect(model.isDirty).toBeFalsy();

        model.field = 'aa';
        model.field1 = 'aa';
        model.commit();
        expect(model.isDirty).toBeFalsy();
    });

    test('Deep dirty check', () => {
        class SomeModel extends Model {
            @field({ deepCheck: true }) @observable.shallow field = [1, 2];

            @field({ deepCheck: true }) @observable.ref field2 = {
                a: 1,
                b: 2,
            };

            constructor() {
                super();
                makeObservable(this);
            }
        }

        const model = SomeModel.create();
        expect(model.isDirty).toBeFalsy();

        model.field = [1, 2, 3];
        expect(model.isDirty).toBeTruthy();

        model.field = [1, 2];
        expect(model.isDirty).toBeFalsy();

        model.field2 = { a: 2, b: 2 };
        expect(model.isDirty).toBeTruthy();

        model.field2 = { a: 1, b: 2 };
        expect(model.isDirty).toBeFalsy();
    });

    test('State check', () => {
        class SomeModel extends Model {
            @field()
            @observable field = 'field';

            field2 = 2;

            constructor() {
                super();
                makeObservable(this);
            }
        }

        const model = SomeModel.create();

        expect(model.state?.field).toEqual('field');
        expect(model.state?.field2).toEqual(2);
    });
});
