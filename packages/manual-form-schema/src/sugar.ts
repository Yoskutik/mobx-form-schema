import { SafeSchemaType } from './types';
import { TValidator, validate } from './validate';
import { factory } from './factory';
import { presentation, TPresentation } from './presentation';
import { watch } from './watch';
import { PRESENTATION } from './utils';

const createNestedSchemaDecorator = (
  object : object,
  propertyKey: string | symbol,
  validateFn: TValidator,
  observeDecorator: PropertyDecorator,
  factoryDecorator: PropertyDecorator,
  presentationFn: TPresentation,
) => {
  validate(validateFn)(object, propertyKey);
  observeDecorator(object, propertyKey);
  factoryDecorator(object, propertyKey);
  return presentation(presentationFn)(object, propertyKey);
};

const validateSchema = schema => !schema.isValid;
const presentSchema = schema => schema[PRESENTATION];

export const nestedSchema = (Schema: SafeSchemaType): PropertyDecorator => (
  (object, propertyKey) => (
    createNestedSchemaDecorator(
      object,
      propertyKey,
      validateSchema,
      watch.schema,
      factory.forSchema(Schema),
      presentSchema,
    )
  )
);

export const nestedSchemasArray = <T extends SafeSchemaType>(Schema: T): PropertyDecorator => (
  (object, propertyKey) => (
    createNestedSchemaDecorator(
      object,
      propertyKey,
      schemas => schemas.some(validateSchema),
      watch.schemasArray,
      factory.forSchemasArray(Schema),
      schemas => schemas.map(presentSchema),
    )
  )
);