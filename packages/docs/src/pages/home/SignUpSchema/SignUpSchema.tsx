import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
// You can see source code of validation functions in the `validators` file
import { email, minLength, required, username } from '../Validation/validators';

const confirmPassword = () => (confirmPasswordValue: string, schema: SignUpSchema) => {
  if (confirmPasswordValue === schema.password) return false;
  return 'Passwords mismatched';
};

export class SignUpSchema extends FormSchema {
  // To define a validation rule for a specific field
  //  simply use @validate decorator and pass validation rules.
  @validate(required(), username())
  @watch username = '';

  // If validation of a field is conditional, you
  //  can use @validate.if decorator, and pass desired condition
  //  as the first argument.
  @validate.if(Boolean, [email()])
  @watch email = '';

  @validate(required(), minLength(8))
  @watch password = '';

  // Your validation rules can depend on other fields of a schema.
  //  Here, if confirmPassword is not equal to password the
  //  validation is considered not passed.
  @validate(required(), confirmPassword())
  @watch confirmPassword = '';
}
