import { defineMetadata, getNewMetadata } from './utils';
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

/**
 * A decorator, that can change the value of `presentation` getter
 * in the form schema.
 *
 * @param presentation
 * @see {@link FormSchema.presentation}
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export const presentation: Presentation = (presentation: TPresentation) => (target: object, propertyKey: string | symbol) => {
  const value: Record<string | symbol, TPresentationConfig> = getNewMetadata(PresentationSymbol, target);
  value[propertyKey] = { presentation };
  defineMetadata(PresentationSymbol, value, target);
};

presentation.hidden = (target: object, propertyKey: string | symbol) => {
  const value: Record<string | symbol, TPresentationConfig> = getNewMetadata(PresentationSymbol, target);
  value[propertyKey] = { hidden: true };
  defineMetadata(PresentationSymbol, value, target);
};