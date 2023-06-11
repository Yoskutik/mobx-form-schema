import { factory, FormSchema, presentation, watch } from '@yoskutik/mobx-form-schema';

const usernamePresentation = (value: string) => {
  const username = value.trim();
  return username[0] === '@' ? username : `@${username}`;
};

const nameFactory = (name: string) => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

export class Example5Schema extends FormSchema {
  @presentation(usernamePresentation)
  @watch username = '';

  @factory(nameFactory)
  @watch name = '';
}