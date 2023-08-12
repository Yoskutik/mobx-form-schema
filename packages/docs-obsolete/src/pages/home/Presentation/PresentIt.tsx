import { Typography } from '@mui/material';
import { FieldBaseSource, TextFieldSource } from '@components';

import { EntireExample } from '../EntrireExample';
import { HomeBlock } from '../components';
import { PresentationForm } from './PresentationForm';

import PresentationFormSource from 'source-loader!./PresentationForm';
import PresentationSchemaSource from 'source-loader!./PresentationSchema';

const DefaultDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      Each form schema instance have its <i>presentation</i> - an object that contains
      only data of form's fields without any utility data or methods. This object can
      be used as final presentation of your form and send to the server.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      But also <b>you can add a transformation function for each property to transform
      the presentation</b>. For example, you trim your strings, convert Date instances
      into formatted strings or just delete some data from the presentation.
    </Typography>
  </>
);

export const PresentIt = () => (
  <HomeBlock title="Present it!">
    <DefaultDescription />

    <EntireExample
      items={[
        PresentationSchemaSource,
        PresentationFormSource,
        TextFieldSource,
        FieldBaseSource,
      ]}
    >
      <PresentationForm />
    </EntireExample>
  </HomeBlock>
);