import { FormSchema, validate, watch } from '@yoskutik/mobx-form-schema';

import { email } from '@utils';

const username = () => (value: string) => {
  if (!value.match(/^@[A-Za-z0-9]+$/)) return 'Not a valid username';
  return false;
};

export class ContactsSectionSchema extends FormSchema {
  @validate(email()).if(Boolean)
  @watch email = '';

  @watch tel = '';

  @validate(username()).if(Boolean)
  @watch telegram = '';

  @validate(username()).if(Boolean)
  @watch instagram = '';
}