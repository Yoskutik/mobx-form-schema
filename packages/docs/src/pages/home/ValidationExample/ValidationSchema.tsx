import { FormSchema, validate } from '@yoskutik/form-schema';
import { email, required } from '../Validation/validators';

const shouldValidateCheckboxDependentValue = (_: string, schema: ValidationSchema) => schema.checkbox;

export class ValidationSchema extends FormSchema {
  @validate(required())
  requiredField = '';

  // or @validate.if((value) => !!value, [email()])
  @validate.if(Boolean, [email()])
  optionalEmail = '';

  @validate.if(shouldValidateCheckboxDependentValue, [required()])
  checkboxDependentValue = '';

  checkbox = false;
}