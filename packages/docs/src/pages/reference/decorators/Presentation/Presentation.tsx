import { Code, EntireExample, Highlighter, List, Section, Text } from '@components';
import presentationDeclarationSource from 'source-loader!./presentationDeclaration';
import PresentationSchemaSource from 'source-loader!./PresentationSchema';
import PresentationHiddenSchemaSource from 'source-loader!./PresentationHiddenSchema';
import styles from '../../Reference.module.scss';

const Presentation = () => (
  <>
    <Section title={<>The <Code>@present</Code> decorator</>}>
      <Text>
        You can retrieve your form schema&apos;s data presentation by using
        the <Code>presentation</Code> getter. By default, this returns an object of the form schema&apos;s
        values without any utility methods or data like the <Code>errors</Code> objects or
        the <Code>getInitial</Code> method. But you can modify its value for each property separately if
        you apply the <Code>@present</Code> decorator.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        className={styles.referenceHighlighter}
        code={presentationDeclarationSource.code}
      />

      <Text>
        The <Code>@present</Code> receive a function, which receives 2 arguments:
      </Text>

      <List variant="ol">
        <li>The current value of a property;</li>
        <li>An entire schema.</li>
      </List>

      <Section title="Example of usage">
        <EntireExample items={[PresentationSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@present.hidden</Code> decorator</>}>
      <Text>
        The <Code>@present.hidden</Code> is a modification of the <Code>@present</Code> decorator,
        which must be used in order to completely delete the data from the presentation.
      </Text>

      <Text>
        The <Code>@factory.hidden</Code> is just a decorator and does not receive any arguments.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[PresentationHiddenSchemaSource]} />
      </Section>
    </Section>
  </>
);

export default Presentation;
