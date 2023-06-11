import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, TextLink } from '@components';
import hidden from '../../examples/PresentationDescription/hidden.example';
import presentation from './presentation.example';

const Link = ({ id }: { id: string }) => (
  <Typography component="p">
    For better understanding see:
    <TextLink text="example" id={`presentation.${id}`} />.
  </Typography>
);

export const PresentationDescription = () => (
  <PageBlock
    title="Presentation"
    description={(
      <Typography component="p">
        You can describe how the data must be handled before sending it to the server.
      </Typography>
    )}
  >
    <PageBlock title={<Code>@presentation()</Code>}>
      <Highlighter code={presentation} />
      <Link id="with-transformations" />
    </PageBlock>

    <PageBlock
      title={<Code>@presentation.hide</Code>}
      description={(
        <Typography component="p">
          If you want, you can hide some properties from the presentation of your form.
        </Typography>
      )}
    >
      <Highlighter code={hidden} />
    </PageBlock>
  </PageBlock>
);