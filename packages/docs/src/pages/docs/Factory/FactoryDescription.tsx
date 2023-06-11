import { Typography } from '@mui/material';
import { Code, Highlighter, PageBlock, TextLink } from '@components';
import factory from './factory.example';

const Link = ({ id }: { id: string }) => (
  <Typography component="p">
    For better understanding see:
    <TextLink text="example" id={`initialization.${id}`} />.
  </Typography>
);

export const FactoryDescription = () => (
  <PageBlock
    title="Factory"
    description={(
      <Typography component="p">
        You can describe how the data, received from server, must be handled before it will be
        used.
      </Typography>
    )}
  >
    <PageBlock
      title={<Code>@factory()</Code>}
      description={(
        <Typography component="p">
          The function that is passed into factory receives 2 parameters - the current value of the
          object, that was passed into static <Code>create</Code> method; and this object entirely.
        </Typography>
      )}
    >
      <Highlighter code={factory} />

      <Link id="basic-usage" />
    </PageBlock>
  </PageBlock>
);