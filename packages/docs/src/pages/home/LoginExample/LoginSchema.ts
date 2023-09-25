import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { email, required } from '../Validation/validators';

export class LoginSchema extends FormSchema {
  @validate(required(), email())
  @watch email = '';

  @validate(required())
  @watch password = '';

  @watch shouldRememberMe = false;
}
