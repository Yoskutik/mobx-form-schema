import { TPageLink } from '@components';
import { lazyWithPreload } from '@hocs';

export const REFERENCE_TABLE_OF_CONTENTS_LINKS: [string, TPageLink[]][] = [
  ['FormSchema', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./form-schema/Initialization/Initialization'),
      ),
      to: '/reference/form-schema/create',
      title: 'Initialization',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./form-schema/Validation/Validation'),
      ),
      to: '/reference/form-schema/validity',
      title: 'Validity getters and methods',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./form-schema/Observation/Observation'),
      ),
      to: '/reference/form-schema/changes',
      title: 'Changes observation getters and methods',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./form-schema/Presentation/Presentation'),
      ),
      to: '/reference/form-schema/presentation',
      title: 'Presentation',
    },
  ]],
  ['Decorators', [
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/Validate/Validate'),
      ),
      to: '/reference/decorators/validate',
      title: '@validate',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/Watch/Watch'),
      ),
      to: '/reference/decorators/watch',
      title: '@watch',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/Factory/Factory'),
      ),
      to: '/reference/decorators/factory',
      title: '@factory',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/Presentation/Presentation'),
      ),
      to: '/reference/decorators/presentation',
      title: '@presentation',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/NestedSchema/NestedSchema'),
      ),
      to: '/reference/decorators/nestedSchema',
      title: '@nestedSchema',
    },
    {
      Component: lazyWithPreload(
        () => /* webpackPrefetch: true */ import('./decorators/NestedSchemasArray/NestedSchemasArray'),
      ),
      to: '/reference/decorators/nested-schemas-array',
      title: '@nestedSchemasArray',
    },
  ]],
];
