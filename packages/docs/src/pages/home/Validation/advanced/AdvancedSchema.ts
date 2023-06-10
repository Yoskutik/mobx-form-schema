import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { required, lengthBetween } from '../validators';

const repeatedPassword = () => (repeated: string, schema: AdvancedSchema) => {
  if (repeated === schema.password) return false;
  return 'Passwords mismatched';
};

export class AdvancedSchema extends FormSchema {
  @validate(required())
  @observable login = '';

  @validate(required(), lengthBetween(8, 32))
  @observable password = '';

  @validate(required(), repeatedPassword())
  @observable repeatedPassword = '';
}