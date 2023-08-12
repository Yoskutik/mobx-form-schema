import { updateMetadata } from './utils';
import { ValidateSymbol } from './symbols';
import { CreateDecoratorType, FieldOrGetDecoratorThis } from './types';

type TValidationCondition<This, Value> = CreateDecoratorType<
  (value: Value, obj: This) => boolean,
  (value: any, obj: any) => boolean
>;

export type TValidationConfig<This, Value> = {
  validators: TValidator<This, Value>[];
  condition?: TValidationCondition<This, Value>;
};

export type TValidator<This, Value> = CreateDecoratorType<
  (value: Value, obj: This) => string | boolean,
  (value: any, obj: any) => string | boolean
>;

export interface Validate {
  <This, Value>(...args: TValidator<This, Value>[]): FieldOrGetDecoratorThis<This, Value>;

  /**
   * A decorator that can set conditional validation.
   *
   * @param condition - Condition of validation. If this function return
   * true, the validation rules will be applied. If not, the property is
   * considered valid.
   * @param validators - Validation rules. See {@link validate} to
   * understand how they work.
   *
   * @see {@link FormSchema.isValid}
   * @see {@link FormSchema.errors}
   *
   * @example
   * ```typescript
   * const shouldValidateEmail = (email: string) => !!email;
   *
   * class Schema extends FormSchema {
   *   @validate.if(shouldValidateEmail, [required(), email()])
   *   @watch email = '';
   * }
   * ```
   */
  if<This, Value>(condition: typeof Boolean, validators: TValidator<This, Value>[]): FieldOrGetDecoratorThis<This, Value>;
  if<This, Value>(condition: TValidationCondition<This, Value>, validators: TValidator<This, Value>[]): FieldOrGetDecoratorThis<This, Value>;
}

/**
 * A decorator that can set validation rules for a property.
 *
 * @param validators - Rules for validation. Each rule is applied
 * sequentially. If any rule return `true` or any string the validation
 * process is interrupted. This returned value starts to be stored in
 * the {@link FormSchema.errors} object. But if all the validators
 * return false, the property will be considered valid.
 *
 * @see {@link FormSchema.isValid}
 * @see {@link FormSchema.errors}
 *
 * @example
 * ```typescript
 * class Schema extends FormSchema {
 *   @validate(required(), email())
 *   @watch email = '';
 * }
 * ```
 */
export const validate: Validate = (...validators) => (
  (target, propertyKey) => (
    updateMetadata<TValidationConfig<any, any>>(ValidateSymbol, target, propertyKey, { validators })
  )
);

validate.if = (condition, validators) => (
  (target, propertyKey) => (
    updateMetadata<TValidationConfig<any, any>>(ValidateSymbol, target, propertyKey, { validators, condition })
  )
);
