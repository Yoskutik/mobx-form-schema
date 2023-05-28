import { Typography } from '@mui/material';
import { Highlighter, Code, PageBlock } from '@components';
import base from './base.example';
import base2 from './base2.example';

export const PresentationDescription = () => (
  <PageBlock
    title="Presentation"
    description={(
      <Typography component="p">
        An instance of <i>MobX Form Schema</i> contains some utility data. You can get
        rid of all that data by using <Code>presentation</Code> decorator.
      </Typography>
    )}
  >
    <PageBlock title="Usage">
      <Highlighter code={base} />

      <PageBlock
        title="Presentation with transformations"
        description={(
          <Typography component="p">
            But you can also apply any transformation function to change the presentation
            of the exact field. For example, you can trim your string or
            convert <Code>Date</Code> object into string of <Code>yyyy-mm</Code> format.
          </Typography>
        )}
      >
        <Highlighter code={base2} />
      </PageBlock>
    </PageBlock>
  </PageBlock>
);
