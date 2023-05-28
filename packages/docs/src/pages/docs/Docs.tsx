import { memo } from 'react';
import { PageWithNavigation } from '@components';
import { ValidationDescription } from './ValidationDescription';
import { ObservationDescription } from './ObservationDescription';
import { InitializationDescription } from './InitializationDescription';
import { PresentationDescription } from './PresentationDescription';

const Docs = memo(() => (
  <PageWithNavigation>
    <ValidationDescription />
    <ObservationDescription />
    <InitializationDescription />
  </PageWithNavigation>
));

export default Docs;
