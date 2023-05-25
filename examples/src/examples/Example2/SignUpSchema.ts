import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { email, minLength, required } from '@utils';

const repeatedPassword = () => (password: string, record: SignUpSchema) => {
  if (password === record.password) return false;
  return 'Passwords mismatched';
};

export class SignUpSchema extends FormSchema {
  @validate(required())
  @watch name = '';

  @validate(required())
  @watch surname = '';

  @validate(email()).if(Boolean)
  @watch email = '';

  @validate(required(), minLength(8))
  @watch password = '';

  @validate(required(), repeatedPassword())
  @watch repeatedPassword = '';
}