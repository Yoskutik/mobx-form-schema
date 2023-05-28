import { FormSchema, presentation, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { required, minLength } from '../Validation/validators';

const repeatedPassword = () => (repeated: string, schema: PresentationSchema) => {
  if (repeated === schema.password) return false;
  return 'Passwords mismatched';
};

export class PresentationSchema extends FormSchema {
  @presentation(value => value?.trim())
  @observable name = '';

  @validate(required())
  @observable login = '';

  @validate(required(), minLength(8))
  @observable password = '';

  @presentation(() => undefined)
  @validate(required(), repeatedPassword())
  @observable repeatedPassword = '';
}