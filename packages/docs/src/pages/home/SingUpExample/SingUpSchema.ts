import { FormSchema, validate, watch, presentation } from '@yoskutik/form-schema';
import { email, minLength, required } from '../Validation/validators';

const repeatedPassword = () => (repeatedValue: string, schema: SingUpSchema) => {
  if (repeatedValue === schema.password) return false;
  return 'Passwords mismatched';
};

export class SingUpSchema extends FormSchema {
  @validate(required(), email())
  @watch email = '';

  @validate(required(), minLength(8))
  @watch password = '';

  @presentation.hidden
  @validate(required(), repeatedPassword())
  @watch repeatedPassword = '';
}