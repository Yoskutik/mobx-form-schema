import { TPageLink } from '@components';
import { lazyWithPreload } from '@hocs';

export const REFERENCE_TABLE_OF_CONTENTS_LINKS: [string, TPageLink[]][] = [
  ['FormSchema', [
    {
      Component: lazyWithPreload(
        () => import(/* webpackPrefetch: true */ './form-schema/Initialization/Initialization'),
      ),
      to: '/reference/form-schema/create',
      title: 'Initialization',
    },
    {
      Component: lazyWithPreload(() => import('./form-schema/Validation/Validation')),
      to: '/reference/form-schema/validity',
      title: 'Validity getters and methods',
    },
    {
      Component: lazyWithPreload(() => import('./form-schema/Observation/Observation')),
      to: '/reference/form-schema/changes',
      title: 'Changes observation getters and methods',
    },
    {
      Component: lazyWithPreload(() => import('./form-schema/Presentation/Presentation')),
      to: '/reference/form-schema/presentation',
      title: 'Presentation',
    },
  ]],
  ['Decorators', [
    {
      Component: lazyWithPreload(
        () => import(/* webpackPrefetch: true */ './decorators/Validate/Validate'),
      ),
      to: '/reference/decorators/validate',
      title: '@validate',
    },
    {
      Component: lazyWithPreload(() => import('./decorators/Watch/Watch')),
      to: '/reference/decorators/watch',
      title: '@watch',
    },
    {
      Component: lazyWithPreload(() => import('./decorators/Factory/Factory')),
      to: '/reference/decorators/factory',
      title: '@factory',
    },
    {
      Component: lazyWithPreload(() => import('./decorators/Presentation/Presentation')),
      to: '/reference/decorators/present',
      title: '@present',
    },
    {
      Component: lazyWithPreload(() => import('./decorators/NestedSchema/NestedSchema')),
      to: '/reference/decorators/nestedSchema',
      title: '@nestedSchema',
    },
    {
      Component: lazyWithPreload(() => import('./decorators/NestedSchemasArray/NestedSchemasArray')),
      to: '/reference/decorators/nested-schemas-array',
      title: '@nestedSchemasArray',
    },
  ]],
];
