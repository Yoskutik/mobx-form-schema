import { Code, EntireExample, Highlighter, Section, Text, Title } from '@components';
import ExampleSource from 'source-loader!./Example';
import { ExcludedFormSchemaKeyToValue } from '@yoskutik/mobx-form-schema';
import styles from '../../Reference.module.scss';

const Presentation = () => (
  <Section title={<>Getter <Code>presentation</Code></>}>
    <Text>
      The <Code>presentation</Code> getter is needed to get the form schema&apos;s data presentation.
      By default, <Code>presentation</Code> returns an object that contains all the properties
      of a schema without any utility data or methods, like <Code>getInitial</Code> or {' '}
      <Code>errors</Code>.
    </Text>

    <Text>
      But you can affect the content of <Code>presentation</Code> value by applying
      the <Code>@presentation</Code> decorator to any property.
    </Text>

    <Text>
      API reference:
    </Text>

    <Highlighter
      code="public get presentation(): ExcludedFormSchemaKeyToValue<this, any>;"
      className={styles.referenceHighlighter}
    />

    <Section title="Example">
      <EntireExample items={[ExampleSource]} />
    </Section>
  </Section>
);

export default Presentation;
