import { FormSchema, watch } from '@yoskutik/mobx-form-schema';
import { ContactsSchema } from './ContactsSchema';
import { ExperienceSchema } from './ExperienceSchema';

export class CVSchema extends FormSchema {
  @watch name = 'Joe';

  @watch surname = 'Dough';

  @watch.schema contacts = ContactsSchema.create();

  @watch.schemasArray experience = [
    ExperienceSchema.create({
      position: 'Frontend Developer',
      company: 'Big Company',
    }),
  ];
}
