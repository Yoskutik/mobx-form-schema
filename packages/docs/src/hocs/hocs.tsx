import { lazy, ReactNode } from 'react';

type Component = <T>(props: T) => ReactNode;

export const lazyWithPreload = (requestComponent: () => Promise<{ default: Component }>) => {
  const Lazy = lazy(requestComponent);

  let ResultComponent: Component = Lazy;

  const result = () => <ResultComponent />;
  result.preload = async () => {
    await requestComponent().then(it => {
      ResultComponent = it.default;
    });
  };

  return result;
};
