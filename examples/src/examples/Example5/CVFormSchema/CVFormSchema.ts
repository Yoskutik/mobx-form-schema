import { observable, override } from 'mobx';
import { FormSchema, validate, watch, presentation } from '@yoskutik/mobx-form-schema';

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

const skillsValidation = () => (skills: Set<string>) => {
  if (skills.size < 3) return 'Please, add some extra skills';
  if (skills.size > 9) return 'You provided too much skills. Please, be more specific';
  return false;
};

export class CVFormSchema extends FormSchema {
  @validate(required())
  @watch name = '';

  @validate(required())
  @watch surname = '';

  @validate(schema => !schema.isValid)
  @presentation(contactsPresentation)
  @watch.schema
  @observable.ref contacts = ContactsSectionSchema.create();

  @validate(skillsValidation())
  @watch.set skills = new Set<string>();

  @validate(schemas => schemas.some(schema => !schema.isValid))
  @presentation(schemas => schemas.map(schema => schema.presentation))
  @watch.schemasArray
  @observable.shallow experience: ExperienceItemSchema[] = [ExperienceItemSchema.create()];
}