import { Typography } from '@mui/material';
import { Highlighter, Code, PageBlock } from '@components';
import base from './base.example';
import base2 from './base2.example';
import base3 from './base3.example';
import bad from './bad.example';

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
    <PageBlock title="Basic usage">
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

      <Highlighter code={base} />
    </PageBlock>

    <PageBlock
      title="With transformations"
      description={(
        <Typography component="p">
          Sometimes the data that is stored on the server is not very useful in the
          work of the frontend, until they are preprocessed. For example, dates from
          the server will always be passed as a string. But at the same time, it may
          be more convenient to work with them when they are an object of
          the <Code>Date</Code> class.
        </Typography>
      )}
    >
      <Typography component="p">
        You can do this:
      </Typography>

      <Highlighter code={bad} />

      <Typography component="p">
        This is a working approach, but I would not say that it is beautiful. And also
        in this case, you have to use the rest operator, and this adds odd calculations,
        which can be avoided.
      </Typography>

      <Typography component="p">
        After all, you can specify in the scheme itself how to initialize your fields.
        To do this, you can use the <Code>@factory</Code> decorator.
      </Typography>

      <Highlighter code={base2} />

      <Typography component="p">
        And you all can use the entire object in the factory function, in case the initial
        value of one field is somehow depends on the value of other field.
      </Typography>

      <Highlighter code={base3} />
    </PageBlock>
  </PageBlock>
);
