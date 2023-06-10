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
      <Typography component="p">
        There's 2 ways to set the initial values for your form - you can set the
        value in the schema class, and you can pass them to the create function.
        And usually to create a pre-filled form, you will pass the data into
        create method.
      </Typography>

      <Typography component="p">
        In MobX, you have to initialize your property with any value if you want
        to make the observable, which is why you also have to create initial
        values in your schema.
      </Typography>

      <Typography component="p">
        But don't be too upset about it. This mechanism actually helps with
        safety issues. For example, you the server don't send any value for your
        schema, this initial value from the class will help you to avoid errors.
      </Typography>

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
