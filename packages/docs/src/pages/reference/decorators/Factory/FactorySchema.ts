import { factory, FormSchema, TFactoryData } from '@yoskutik/mobx-form-schema';

const createProp1 = (prop1Value: number) => prop1Value * 10;

const createProp2 = (prop2Value: number, data: TFactoryData<FactorySchema>) => (
  prop2Value * 100 + data.prop1
);

const createProp3 = (
  prop3Value: string,
  _data: TFactoryData<FactorySchema>,
  _schema: FactorySchema,
  defaultValue: string,
) => prop3Value ?? defaultValue;

export class FactorySchema extends FormSchema {
  @factory(createProp1)
  prop1 = 1;

  @factory(createProp2)
  prop2 = 2;

  @factory(createProp3)
  prop3 = 'Default value';
}

const schema1 = FactorySchema.create({
  prop1: 10,
  prop2: 20,
  prop3: 'prop3 new value',
});

console.log(schema1.prop1, schema1.prop2, schema1.prop3);
// 100, 2010, 'prop3 new value'

const schema2 = FactorySchema.create({
  prop1: -10,
  prop2: 5,
});

console.log(schema2.prop1, schema2.prop2, schema2.prop3);
// -100, 490, 'Default value'
