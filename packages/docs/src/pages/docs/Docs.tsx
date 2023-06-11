import { memo } from 'react';
import { PageBlock, PageWithNavigation } from '@components';
import { FormSchemaDescription } from './FormSchema';
import { WatchDescription } from './Watch';
import { ValidateDescription } from './Validate';
import { FactoryDescription } from './Factory';
import { PresentationDescription } from './Presentation';

const Docs = memo(() => (
  <PageWithNavigation>
    <FormSchemaDescription />
    <PageBlock title="Decorators">
      <ValidateDescription />
      <WatchDescription />
      <FactoryDescription />
      <PresentationDescription />
    </PageBlock>
  </PageWithNavigation>
));

export default Docs;
