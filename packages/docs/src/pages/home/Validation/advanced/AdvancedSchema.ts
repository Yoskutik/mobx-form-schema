import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { required, minLength } from '../validators';

const repeatedPassword = () => (repeated: string, schema: AdvancedSchema) => {
  if (repeated === schema.password) return false;
  return 'Passwords mismatched';
};

export class AdvancedSchema extends FormSchema {
  @validate(required())
  @observable login = '';

  @validate(required(), minLength(8))
  @observable password = '';

  @validate(required(), repeatedPassword())
  @observable repeatedPassword = '';
}