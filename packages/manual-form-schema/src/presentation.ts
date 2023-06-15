import { PRESENTATION, updateMetadata } from './utils';
import { PresentationSymbol } from './symbols';

export type TPresentation = (value: any, obj: any) =>  any;

export type TPresentationConfig = {
  presentation?: TPresentation;
  hidden?: boolean;
};

type Presentation = ((presentation: TPresentation) => PropertyDecorator) & {
  /**
   * A decorator, that can removes the value form `presentation` getter
   * in the form schema.
   *
   * @param presentation
   * @see {@link FormSchema.presentation}
   */
  hidden: PropertyDecorator,
};

const createPresentation = (config: TPresentationConfig): PropertyDecorator => (
  (target: object, propertyKey: string | symbol) => (
    updateMetadata<TPresentationConfig>(PresentationSymbol, target, propertyKey, config)
  )
);

/**
 * A decorator, that can change the value of `presentation` getter
 * in the form schema.
 *
 * @param presentation
 * @see {@link FormSchema.presentation}
 */
export const presentation: Presentation = (presentation: TPresentation) => ( // eslint-disable-line @typescript-eslint/no-shadow
  createPresentation({ [PRESENTATION]: presentation })
);

presentation.hidden = createPresentation({ hidden: true });