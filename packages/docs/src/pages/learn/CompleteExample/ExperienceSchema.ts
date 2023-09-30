import { FormSchema, present, validate, watch } from '@yoskutik/mobx-form-schema';
import { defined, maxValue, minValue, required } from './validators';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

const upToPresent = (monthPropertyName: 'endMonth' | 'startMonth') => (
  (year: number, schema: ExperienceSchema) => {
    if (CURRENT_YEAR < year || (CURRENT_YEAR === year && CURRENT_MONTH < schema[monthPropertyName])) {
      return 'The date must be up to present.';
    }
    return false;
  }
);

const startYearUpToEndYear = () => (
  (startYear: number, { endMonth, endYear, startMonth, stillWorkThere }: ExperienceSchema) => {
    if (stillWorkThere || !endYear) return false;
    if (endYear > startYear || (endMonth && endYear === startYear && endMonth >= startMonth)) {
      return false;
    }
    return 'The start date must be before the end date.';
  }
);

const shouldValidateEnd = (_: unknown, schema: ExperienceSchema) => !schema.stillWorkThere;

const presentEndDate = (value: number, schema: ExperienceSchema) => (
  schema.stillWorkThere ? undefined : value
);

export class ExperienceSchema extends FormSchema {
  @present.hidden
  id = Math.random();

  @validate(required())
  @watch position = '';

  @validate(required())
  @watch company = '';

  @validate(defined(), minValue(1), maxValue(12))
  @watch startMonth: number | undefined = undefined;

  @validate(
    defined(),
    minValue(1950),
    maxValue(CURRENT_YEAR),
    upToPresent('startMonth'),
    startYearUpToEndYear(),
  )
  @watch startYear: number | undefined = undefined;

  @present(presentEndDate)
  @validate.if(shouldValidateEnd, [defined(), minValue(1), maxValue(12)])
  @watch endMonth: number | undefined = undefined;

  @present(presentEndDate)
  @validate.if(shouldValidateEnd, [
    defined(),
    minValue(1950),
    maxValue(CURRENT_YEAR),
    upToPresent('endMonth'),
  ])
  @watch endYear: number | undefined = undefined;

  @watch stillWorkThere = false;
}
