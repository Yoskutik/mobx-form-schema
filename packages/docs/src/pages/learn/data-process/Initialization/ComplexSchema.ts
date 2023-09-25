import { factory, FormSchema, TFactoryData } from '@yoskutik/mobx-form-schema';

const createFullName = (
  _: unknown,
  data: TFactoryData<ComplexSchema>,
  _schema: ComplexSchema,
  defaultValue: string,
) => (
  `${data.name || ''} ${data.surname || ''}`.trim() || defaultValue
);

export class ComplexSchema extends FormSchema {
  name: string | undefined = '';

  surname: string | undefined = '';

  @factory(createFullName)
  fullName: string | undefined = 'Default full name';
}
