/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from "react";
import Loader from "../app/components/Loader/Loader";

interface Options {
  fallback: React.ReactNode;
}
type Unpromisify<T> = T extends Promise<infer P> ? P : T;

export const lazyLoad = <
  T extends Promise<any>,
  U extends React.ComponentType<any>
>(
  importFunc: () => T,
  selectorFunc?: (s: Unpromisify<T>) => U,
  options: Options = { fallback: <Loader /> }
) => {
  let lazyFactory: () => Promise<{ default: U }> = importFunc;

  if (selectorFunc) {
    lazyFactory = () =>
      importFunc().then((module) => ({ default: selectorFunc(module) }));
  }

  const LazyComponent = lazy(lazyFactory);

  return (props: React.ComponentProps<U>): JSX.Element => (
    <Suspense fallback={options.fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
