import { PRESENTATION, updateMetadata } from './utils';
import type { FieldOrGetDecorator, FieldOrGetDecoratorThis } from './types';
import { PresentationSymbol } from './symbols';

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

const createPresentation = <This, Value>(config: TPresentationConfig<This, Value>): FieldOrGetDecoratorThis<This, Value> => (
  (target, propertyKey) => (
    updateMetadata<TPresentationConfig<This, Value>>(PresentationSymbol, target, propertyKey, config)
  )
);

export const presentation: Presentation = <This, Value>(presentation: TPresentation<This, Value>) => ( // eslint-disable-line @typescript-eslint/no-shadow
  createPresentation({ [PRESENTATION]: presentation })
);

presentation.hidden = createPresentation({ hidden: true });