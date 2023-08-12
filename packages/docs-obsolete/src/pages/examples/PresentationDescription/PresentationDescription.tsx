import { Typography } from '@mui/material';
import { Highlighter, Code, PageBlock } from '@components';
import base from './base.example';
import base2 from './base2.example';
import hidden from './hidden.example';

export const PresentationDescription = () => (
  <PageBlock
    title="Presentation"
    description={(
      <Typography component="p">
        Each schema has its representation. And it's not about the UI. Just as we preprocess
        data from the server in order to use it conveniently, we may need the ability to
        reverse convert the data so that it can be properly stored on the server.
      </Typography>
    )}
  >
    <PageBlock title="Basic usage">
      <Typography component="p">
        You can get a representation of the form in the <Code>presentation</Code> getter.
        By default, this getter provides all data from the form with except the utility data
        and methods.
      </Typography>

      <Highlighter code={base} />
    </PageBlock>

    <PageBlock
      title="With transformations"
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
      title="Hidden properties"
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
);
