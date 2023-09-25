import { FormSchema, nestedSchema, nestedSchemasArray, validate, watch } from '@yoskutik/mobx-form-schema';
import { ContactsSchema } from './ContactsSchema';
import { ExperienceSchema } from './ExperienceSchema';
import { required } from './validators';

export class CVSchema extends FormSchema {
  @validate(required())
  @watch name = '';

  @validate(required())
  @watch surname = '';

  @nestedSchema(ContactsSchema)
  contacts = ContactsSchema.create();

  @nestedSchemasArray(ExperienceSchema)
  experience = [
    ExperienceSchema.create({
      position: 'Frontend Developer',
      company: 'Big Company',
    }),
  ];
}
