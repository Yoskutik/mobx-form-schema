import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';

const defined = () => (
  (value?: unknown) => {
    if (value !== null && value !== undefined) return false;
    return 'The value is required.';
  }
);

const email = () => (value: string) => {
  if (/\S+@\S+\.\S+/.test(value)) return false;
  return 'Invalid email format.';
};

const shouldValidateAge = (_: unknown, schema: Schema) => schema.wantToShareAge;

export class Schema extends FormSchema {
  @validate.if(Boolean, [email()])
  @watch optionalEmail = '';

  @validate.if(shouldValidateAge, [defined()])
  @watch age: number | undefined = undefined;

  @watch wantToShareAge = true;
}
