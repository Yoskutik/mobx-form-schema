import { updateMetadata } from './utils';
import { FieldOrGetDecorator, FieldOrGetDecoratorThis } from './types';

export type TPresentation<This, Value> = (value: Value, schema: This) => any;

export type TPresentationConfig<This, Value> = {
  presentation?: TPresentation<This, Value>;
  hidden?: boolean;
};

export interface Presentation {
  /**
   * A decorator, that can change the value of `presentation` getter
   * in the form schema.
   *
   * @param presentation
   * @see {@link FormSchema.presentation}
   */
  <This, Value>(presentation: TPresentation<This, Value>): FieldOrGetDecoratorThis<This, Value>;

  /**
   * A decorator, that can removes the value form `presentation` getter
   * in the form schema.
   *
   * @param presentation
   * @see {@link FormSchema.presentation}
   */
  hidden: FieldOrGetDecorator<any>;
}

/**
 * WARNING: Please, do not use this import in the production build
 * @deprecated
 */
export const __PresentationSymbol = Symbol();

const createPresentation = <This, Value>(config: TPresentationConfig<This, Value>): FieldOrGetDecoratorThis<This, Value> => (
  (target, propertyKey) => (
    updateMetadata<TPresentationConfig<This, Value>>(__PresentationSymbol, target, propertyKey, config)
  )
);

export const presentation: Presentation = <This, Value>(presentation: TPresentation<This, Value>) => ( // eslint-disable-line @typescript-eslint/no-shadow
  createPresentation({ presentation })
);

presentation.hidden = createPresentation({ hidden: true });