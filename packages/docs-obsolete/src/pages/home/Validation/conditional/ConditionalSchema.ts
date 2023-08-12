import { FormSchema, validate } from '@yoskutik/mobx-form-schema';
import { observable } from 'mobx';
import { email, required } from '../validators';

const shouldValidateName = (_name: string, schema: ConditionalSchema) =>
  schema.wantToShareName;

export class ConditionalSchema extends FormSchema {
  @validate(email()).if(Boolean)  // or .if(email => !!email)
  @observable email = '';

  @validate(required()).if(shouldValidateName)
  @observable name = '';

  @observable wantToShareName = false;
}