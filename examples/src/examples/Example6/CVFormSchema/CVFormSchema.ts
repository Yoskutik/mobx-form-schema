import {
  FormSchema,
  validate,
  watch,
  presentation,
  nestedSchemasArray,
  nestedSchema
} from '@yoskutik/mobx-form-schema';

import { required } from '@utils';

import { ContactsSectionSchema } from './ContactsSectionSchema';
import { ExperienceItemSchema } from './ExperienceItemSchema';

const contactsPresentation = (schema: ContactsSectionSchema) => {
  const { presentation } = schema;

  Object.keys(presentation).forEach(key => {
    if (!presentation[key]) {
      delete presentation[key];
    }
  });

  return Object.keys(presentation).length > 0 ? presentation : undefined;
};

const validateSkills = () => (skills: Set<string>) => {
  if (skills.size < 3) return 'Please, add some extra skills';
  if (skills.size > 9) return 'You provided too much skills. Please, be more specific';
  return false;
};

export class CVFormSchema extends FormSchema {
  @validate(required())
  @watch name = '';

  @validate(required())
  @watch surname = '';

  // @validate(schema => !schema.isValid)
  // @presentation(contactsPresentation)
  // @factory.forSchema(ContactsSectionSchema)
  // @watch.schema contacts = ContactsSectionSchema.create();

  @presentation(contactsPresentation)
  @nestedSchema(ContactsSectionSchema)
  contacts = ContactsSectionSchema.create();

  @validate(validateSkills())
  @watch.set skills = new Set<string>();

  // @validate(schemas => schemas.some(schema => !schema.isValid))
  // @presentation(schemas => schemas.map(schema => schema.presentation))
  // @factory.forSchemasArray(ExperienceItemSchema)
  // @watch.schemasArray experience = [ExperienceItemSchema.create()];

  @nestedSchemasArray(ExperienceItemSchema)
  experience = [ExperienceItemSchema.create()];
}