import { lazyWithPreload } from '@hocs';
import { TPageLink } from '@components';

export const LEARN_TABLE_OF_CONTENTS_LINKS: [string, TPageLink[]][] = [
  ['Getting started', [
    {
      Component: lazyWithPreload(() => /* webpackPrefetch: true */ import('./getting-started/Installation')),
      to: '/learn/getting-started/installation',
      title: 'Installation',
    },
    {
      Component: lazyWithPreload(() => /* webpackPrefetch: true */ import('./getting-started/Configuration')),
      to: '/learn/getting-started/configuration',
      title: 'Configuration',
    },
  ]],
  ['Validation', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./validation/BasicValidation/BasicValidation'),
      ),
      to: '/learn/validation/basic',
      title: 'Basic validation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./validation/ComplexValidation/ComplexValidation'),
      ),
      to: '/learn/validation/complex',
      title: 'Complex validation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./validation/ManualValidation/ManualValidation'),
      ),
      to: '/learn/validation/manual',
      title: 'Manual validation',
    },
  ]],
  ['Observation', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./observation/BasicObservation/BasicObservation'),
      ),
      to: '/learn/observation/basic',
      title: 'Basic observation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./observation/NonPrimitiveObservation/NonPrimitiveObservation'),
      ),
      to: '/learn/observation/modifiers',
      title: 'Non-primitives observation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./observation/CustomObservation/CustomObservation'),
      ),
      to: '/learn/observation/custom',
      title: 'Custom observation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./observation/ManualObservation/ManualObservation'),
      ),
      to: '/learn/observation/manual',
      title: 'Manual observation',
    },
  ]],
  ['Data process', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./data-process/Initialization/Initialization'),
      ),
      to: '/learn/data-process/pre',
      title: 'Pre-process:\nInitialization',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./data-process/Presentation/Presentation'),
      ),
      to: '/learn/data-process/post',
      title: 'Post-process:\nPresentation',
    },
  ]],
  ['Complete example', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./CompleteExample/CompleteExample'),
      ),
      to: '/learn/complete-example',
      title: 'Complete example',
    },
  ]],
];
