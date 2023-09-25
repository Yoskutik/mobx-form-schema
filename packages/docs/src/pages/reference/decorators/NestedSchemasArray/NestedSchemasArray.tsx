import { Code, EntireExample, Section, Text } from '@components';
import NestedSchemaSchemaSource from 'source-loader!./NestedSchemaSchema';

const NestedSchemasArray = () => (
  <Section title={<>The <Code>@nestedSchemasArray</Code> decorator</>}>
    <Text>
      The <Code>@nestedSchemasArray</Code> decorator is just a sugar to improve your developer
      experience. It works the same as the <Code>@nestedSchema</Code> decorator, but for an
      array of nested schemas.
    </Text>

    <Text>
      The <Code>@nestedSchemasArray</Code> receives a class of the nested form schema for the
      desired property.
    </Text>

    <Section title="Example of usage">
      <EntireExample items={[NestedSchemaSchemaSource]} />
    </Section>
  </Section>
);

export default NestedSchemasArray;
