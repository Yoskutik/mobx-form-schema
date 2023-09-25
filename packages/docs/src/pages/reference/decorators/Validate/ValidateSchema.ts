import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';

const confirmPassword = () => (
  (confirmPasswordValue: string, schema: Schema) => {
    if (confirmPasswordValue === schema.password) return false;
    return 'Passwords mismatched.';
  }
);

const required = () => (
  (value: string) => {
    if (value?.trim()) return false;
    return 'The value is required.';
  }
);

const minLength = (min: number) => (
  (value: string) => {
    if (value.length >= min) return false;
    return `The value must be ${min} symbols at least.`;
  }
);

export class Schema extends FormSchema {
  @validate(required(), minLength(8))
  @watch password = '';

  @validate(required(), confirmPassword())
  @watch confirmPassword = '';
}
