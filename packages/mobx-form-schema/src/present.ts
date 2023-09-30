import { PRESENTATION, updateMetadata } from './utils';
import type { FieldOrGetDecorator, FieldOrGetDecoratorWithContext } from './types';
import { PresentationSymbol } from './symbols';

export type TPresentation<This, Value> = (value: Value, schema: This) => any;

export type TPresentConfig<This, Value> = {
  presentation?: TPresentation<This, Value>;
  hidden?: boolean;
};

export interface Present {
  /**
   * A decorator, that can change the value of `presentation` getter
   * in the form schema.
   *
   * @param presentation
   * @see {@link FormSchema.presentation}
   */
  <This, Value>(presentation: TPresentation<This, Value>): FieldOrGetDecoratorWithContext<This, Value>;

  /**
   * A decorator, that can remove the value form `presentation` getter
   * in the form schema.
   *
   * @see {@link FormSchema.presentation}
   */
  hidden: FieldOrGetDecorator<any>;
}

const createPresentation = <This, Value>(
  config: TPresentConfig<This, Value>,
): FieldOrGetDecoratorWithContext<This, Value> => (
  (target, propertyKey) => (
    updateMetadata<TPresentConfig<This, Value>>(PresentationSymbol, target, propertyKey, config)
  )
);

// eslint-disable-next-line @typescript-eslint/no-shadow
export const present: Present = <This, Value>(presentation: TPresentation<This, Value>) => (
  createPresentation({ [PRESENTATION]: presentation })
);

present.hidden = createPresentation({ hidden: true });
