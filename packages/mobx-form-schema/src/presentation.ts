import { defineMetadata, getNewMetadata } from './utils';
import { PresentationSymbol } from './symbols';

export type TPresentation = (value: any, obj: any) =>  any;

type Presentation = (presentation: TPresentation) => PropertyDecorator;

/**
 * A decorator, that can change the value of `presentation` getter
 * in the form schema.
 *
 * @param presentation
 * @see {@link FormSchema.presentation}
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export const presentation: Presentation = (presentation: TPresentation) => (target: object, propertyKey: string | symbol) => {
  const value: Record<string | symbol, TPresentation> = getNewMetadata(PresentationSymbol, target);
  value[propertyKey] = presentation;
  defineMetadata(PresentationSymbol, value, target);
};