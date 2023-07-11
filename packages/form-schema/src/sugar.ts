import type { Constructable, FieldDecorator, FieldOrGetDecorator } from './types';
import { type TValidator, validate } from './validate';
import { factory } from './factory';
import { presentation, TPresentation } from './presentation';
import { watch } from './watch';
import type { FormSchema } from './FormSchema';

const createNestedSchemaDecorator = <This, Value>(
  object: any,
  propertyKey: any,
  validateFn: TValidator<This, Value>,
  observeDecorator: FieldOrGetDecorator<any>,
  factoryDecorator: FieldDecorator<any>,
  presentationFn: TPresentation<This, Value>,
) => {
  validate<This, Value>(validateFn)(object, propertyKey);
  observeDecorator(object, propertyKey);
  factoryDecorator(object, propertyKey);
  return presentation<This, Value>(presentationFn)(object, propertyKey);
};

const validateSchema = schema => !schema.isValid;
const presentSchema = schema => schema.presentation;

export const nestedSchema = <T extends FormSchema>(Schema: Constructable<T>): FieldDecorator<T> => (
  (object, propertyKey) => (
    createNestedSchemaDecorator<unknown, T>(
      object,
      propertyKey,
      validateSchema,
      watch.schema,
      factory.schema(Schema),
      presentSchema,
    )
  )
);

export const nestedSchemasArray = <T extends FormSchema>(Schema: Constructable<T>): FieldDecorator<T[]> => (
  (object, propertyKey) => (
    createNestedSchemaDecorator<unknown, T[]>(
      object,
      propertyKey,
      schemas => schemas.some(validateSchema),
      watch.schemasArray,
      factory.schemasArray(Schema),
      schemas => schemas.map(presentSchema),
    )
  )
);