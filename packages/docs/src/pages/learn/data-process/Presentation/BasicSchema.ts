import { FormSchema, present } from '@yoskutik/mobx-form-schema';
import { makeObservable, observable } from 'mobx';

const presentUsername = (username: string) => (!username ? username : `@${username}`);

const presentTitle = (_: unknown, schema: BasicSchema) => {
  if (!schema.username && !schema.name) return 'The unknown';
  if (!schema.username && schema.name) return `The boring ${schema.name}`;
  if (schema.username && !schema.name) return `The sneaky @${schema.username}`;
  return `${schema.name} the @${schema.username}`;
};

export class BasicSchema extends FormSchema {
  @present(presentUsername)
  username = '';

  name = '';

  @present(presentTitle)
  title = '';

  constructor() {
    super();
    makeObservable(this, {
      username: observable.ref,
      name: observable.ref,
    });
  }
}
