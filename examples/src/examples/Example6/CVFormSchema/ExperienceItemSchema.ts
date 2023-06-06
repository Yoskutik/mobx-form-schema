import { FormSchema, validate, watch, presentation } from '@yoskutik/mobx-form-schema';

import { defined, required } from '@utils';

const month = () => (value: number) => {
  if (value < 0 || value > 12) return 'Incorrect month';
  return false;
};

const validateFromYear = () => (year: number, record: ExperienceItemSchema) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  if (year > currentYear || (year === currentYear && record.fromMonth > now.getMonth())) {
    return 'You\'ve choice incorrect year';
  }
  return false;
};

const shouldValidateToDates = (_: unknown, schema: ExperienceItemSchema) => !schema.stillWorking;

export class ExperienceItemSchema extends FormSchema {
  @presentation(() => undefined)
  id = Math.random();

  @validate(defined(), month())
  @watch fromMonth: number | null = null;

  @validate(defined(), validateFromYear())
  @watch fromYear: number | null = null;

  @presentation((value, schema) => schema.stillWorking ? undefined : value)
  @validate(defined(), month()).if(shouldValidateToDates)
  @watch toMonth: number | null = null;

  @presentation((value, schema) => schema.stillWorking ? undefined : value)
  @validate(defined(), validateFromYear()).if(shouldValidateToDates)
  @watch toYear: number | null = null;

  @watch stillWorking = false;

  @validate(required())
  @watch responsibilities = '';

  @validate(required())
  @watch companyName = '';

  @validate(required())
  @watch position = '';
}
