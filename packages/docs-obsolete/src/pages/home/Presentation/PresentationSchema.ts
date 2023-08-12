import { FormSchema, presentation, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { required, lengthBetween } from '../Validation/validators';

const repeatedPassword = () => (repeated: string, schema: PresentationSchema) => {
  if (repeated === schema.password) return false;
  return 'Passwords mismatched';
};

export class PresentationSchema extends FormSchema {
  @presentation(value => value?.trim())
  @observable name = '';

  @validate(required())
  @observable login = '';

  @validate(required(), lengthBetween(8, 32))
  @observable password = '';

  @presentation.hidden
  @validate(required(), repeatedPassword())
  @observable repeatedPassword = '';
}