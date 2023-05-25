import { defineMetadata, getMetadata, getNewMetadata } from './utils';
import { ValidateSymbol } from './symbols';

export type TValidationConfig = {
  validators: TValidator[];
  condition?: (value: any, obj: any) => boolean;
};

type TValidator = (value: any, obj: any) =>  string | boolean;

type Validate = (...args: TValidator[]) => PropertyDecorator & {
  if: (condition: TValidationConfig['condition']) => PropertyDecorator;
};

/**
 * A decorator, that can set validation rules for a property. You
 * can also specify any conditions for the validation in the `if`
 * function. All the validators and conditions are running in
 * the `autorun` function from MobX. Which is means, that if
 * the validation rule or a condition is changed, the error for
 * the property will be recalculated.
 *
 * @see {@link FormSchema.isValid}
 * @see {@link FormSchema.errors}
 */
export const validate: Validate = (
  function () {
    const validators: TValidator[] = Array.from(arguments);

    const createdDecorator: ReturnType<Validate> = (
      (target: object, propertyKey: string | symbol) => {
        const value: Record<string | symbol, TValidationConfig> = getNewMetadata(ValidateSymbol, target);
        value[propertyKey] = { validators };
        defineMetadata(ValidateSymbol, value, target);
      }
    ) as any;

    createdDecorator.if = condition => (target: object, propertyKey: string | symbol) => {
      createdDecorator(target, propertyKey);
      const value: Record<string | symbol, TValidationConfig> = getMetadata(ValidateSymbol, target);
      value[propertyKey].condition = condition;
    };

    return createdDecorator;
  }
);