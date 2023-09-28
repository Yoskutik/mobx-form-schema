import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';
import { email, required } from '../../LearnStartPage/validators';

const shouldValidateEmail = (emailValue: string) => !!emailValue;

const shouldValidatePetName = (name: string, schema: ConditionalSchema) => schema.doesHavePet;

export class ConditionalSchema extends FormSchema {
  // or it can be @validate.if(Boolean, [email()])
  @validate.if(shouldValidateEmail, [email()])
  @watch email = '';

  @watch doesHavePet = false;

  @validate.if(shouldValidatePetName, [required()])
  @watch petName = '';
}
