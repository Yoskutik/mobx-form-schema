import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { minLength, required } from '../../LearnStartPage/validators';

const confirmPassword = () => (
  (confirmPasswordValue: string, schema: ComplexSchema): boolean | string => {
    if (confirmPasswordValue === schema.password) return false;
    return 'Passwords mismatched';
  }
);

export class ComplexSchema extends FormSchema {
  @validate(required(), minLength(8))
  @watch password = '';

  @validate(required(), confirmPassword())
  @watch confirmPassword = '';
}
