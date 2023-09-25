import { FormSchema, presentation, validate, watch } from '@yoskutik/mobx-form-schema';
import { required, username, email, minLength } from './validators';

const confirmPassword = () => (
  (confirmPasswordValue: string, schema: SignUpSchema): boolean | string => {
    if (confirmPasswordValue === schema.password) return false;
    return 'Passwords mismatched';
  }
);

export class SignUpSchema extends FormSchema {
  @validate(required(), username())
  @watch username = '';

  @validate(required(), email())
  @watch email = '';

  @validate(required(), minLength(8))
  @watch password = '';

  @presentation.hidden
  @validate(required(), confirmPassword())
  @watch confirmPassword = '';

  @watch shouldStayLoggedIn = false;
}
