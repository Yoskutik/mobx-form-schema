import { Code, EntireExample, List, Section, Text } from '@components';
import NestedSchemaSchemaSource from 'source-loader!./NestedSchemaSchema';

const NestedSchema = () => (
  <Section title={<>The <Code>@nestedSchema</Code> decorator</>}>
    <Text>
      The <Code>@nestedSchema</Code> decorator is just a sugar to improve your developer experience.
      Usually, when you use nested form schemas, you have to:
    </Text>

    <List>
      <li>Use a factory for initializing form schema from plain objects;</li>
      <li>Use validation in order to understand if the nested schema is valid;</li>
      <li>Use observation in order to understand if the nested schema is changed;</li>
      <li>Use presentation in order to present the nested schema&apos;s data.</li>
    </List>

    <Text>
      The <Code>@nestedSchema</Code> receives a class of the nested form schema for the desired property.
    </Text>

    <Section title="Example of usage">
      <EntireExample items={[NestedSchemaSchemaSource]} />
    </Section>
  </Section>
);

export default NestedSchema;
