import { Typography } from '@mui/material';
import { Highlighter, Code, PageBlock } from '@components';
import base from './base.example';
import base2 from './base2.example';

export const InitializationDescription = () => (
  <PageBlock
    title="Initialization"
    description={(
      <Typography component="p">
        To create an instance of <i>MobX Form Schema</i> you have to call static
        method <Code>create</Code>. This method can be called without any data or
        with a data, that will be used in the initialization process. By default,
        data from the passed object is applied without any transformations.
      </Typography>
    )}
  >
    <PageBlock title="Usage">
      <Highlighter code={base} />

      <PageBlock
        title="Initialization with transformations"
        description={(
          <Typography component="p">
            But you can use <Code>factory</Code> decorator to apply a transformation
            function for the passed data.
          </Typography>
        )}
      >
        <Highlighter code={base2} />
      </PageBlock>
    </PageBlock>
  </PageBlock>
);
