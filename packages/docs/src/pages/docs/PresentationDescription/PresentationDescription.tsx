import { Typography } from '@mui/material';
import { Highlighter, Code, PageBlock } from '@components';
import base from './base.example';
import base2 from './base2.example';
import hidden from './hidden.example';

export const PresentationDescription = () => (
  <PageBlock
    title="Presentation"
    description={(
      <>
        <Typography component="p">
          Each Schema has its presentation. There's nothing common to UI. The <i>
          presentation</i> is just an object, that contains handled data from the
          schema. By default, schema's presentation contains all the data of the
          schema beside the utility methods and getters. Such presentation may
          be useful to communicate with backend.
        </Typography>

        <Typography component="p">
          But cutting of utility methods is not the end. You can also decide
          what other properties must be cut off. Or you can transform the values
          from your schema.
        </Typography>
      </>
    )}
  >
    <PageBlock title="Usage">
      <Typography component="p">
        To get the presentation of your form simply call <Code>presentation</Code> getter.
      </Typography>

      <Highlighter code={base} />

      <PageBlock
        title="Presentation with transformations"
        description={(
          <>
            <Typography component="p">
              Imagine you may have a <Code>Date</Code> object in your schema, and this
              object must be used in your components. But you backend should must receive
              the string of format <Code>yyyy-mm</Code>. And this is when the presentation
              can really help you.
            </Typography>

            <Typography component="p">
              To create a transformation function for a property, use <Code>presentation
              </Code> decorator.
            </Typography>
          </>
        )}
      >
        <Highlighter code={base2} />
      </PageBlock>

      <PageBlock
        title="Hide properties"
        description={(
          <Typography component="p">
            If you want to completely remove the property from the presentation of your
            form you can use <Code>presentation.hidden</Code> decorator.
          </Typography>
        )}
      >
        <Highlighter code={hidden} />
      </PageBlock>
    </PageBlock>
  </PageBlock>
);
