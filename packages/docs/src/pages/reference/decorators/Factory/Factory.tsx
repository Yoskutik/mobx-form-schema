import { Code, EntireExample, Highlighter, List, Section, Text } from '@components';
import factoryDeclarationSource from 'source-loader!./factoryDeclaration';
import FactorySchemaSource from 'source-loader!./FactorySchema';
import FactorySetSchemaSource from 'source-loader!./FactorySetSchema';
import FactorySchemaSchemaSource from 'source-loader!./FactorySchemaSchema';
import FactorySchemasArraySchemaSource from 'source-loader!./FactorySchemasArraySchema';
import styles from '../../Reference.module.scss';

const Factory = () => (
  <>
    <Section title={<>The <Code>@factory</Code> decorator</>}>
      <Text>
        You can create your schemas with pre-filled data, e.g. from a backend response. To do it, you have
        to pass the data into the <Code>create</Code> static method of the schema. By default, values
        from the passed object are applied directly. But you can describe how such values must be
        preprocessed before being assigned. All you have to do is use the <Code>@factory</Code> decorator.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        className={styles.referenceHighlighter}
        code={factoryDeclarationSource.code}
      />

      <Text>
        The <Code>factory</Code> receives a function, which receives 4 arguments:
      </Text>

      <List variant="ol">
        <li>
          A value from the object, which is passed to the <Code>create</Code> static method for the desired
          property.
        </li>
        <li>
          An entire object, which is passed to the <Code>create</Code> static method.
        </li>
        <li>
          A form schema in its current state. Be careful using this argument, the schema hasn&apos;t
          finished filling in the data while being pre-processed.
        </li>
        <li>
          A default value of a property that is declared in a schema.
        </li>
      </List>

      <Section title="Example of usage">
        <EntireExample items={[FactorySchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@factory.set</Code> decorator</>}>
      <Text>
        The <Code>@factory.set</Code> is a modification of the <Code>@factory</Code> decorator, which
        must be used in order to create sets from the data object.
      </Text>

      <Text>
        The <Code>@factory.set</Code> is just a decorator and does not receive any arguments.
      </Text>

      <Text>
        After you apply the <Code>@factory.set</Code> decorator, you can pass arrays into
        the <Code>create</Code> static method, and MobX Form Schema will create a set using the
        passed array.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[FactorySetSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@factory.schema</Code> decorator</>}>
      <Text>
        The <Code>@factory.schema</Code> is a modification of the <Code>@factory</Code> decorator, which
        must be used in order to create nested schemas from the data object.
      </Text>

      <Text>
        The <Code>@factory.schema</Code> receives a class of the nested form schema for the desired property.
      </Text>

      <Text>
        After you apply the <Code>@factory.schema</Code> decorator, you can pass a plain object into
        the <Code>create</Code> static method, and MobX Form Schema will create a valid nested form schema
        instance using the passed plain object.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[FactorySchemaSchemaSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@factory.schemasArray</Code> decorator</>}>
      <Text>
        The <Code>@factory.schemasArray</Code> is a modification of the <Code>@factory</Code> decorator,
        which must be used in order to create arrays of nested schemas from the data object.
      </Text>

      <Text>
        The <Code>@factory.schemas</Code> receives a class of the nested form schema for the desired property.
      </Text>

      <Text>
        After you apply the <Code>@factory.schemasArray</Code> decorator, you can pass an array of plain
        objects into the <Code>create</Code> static method, and MobX Form Schema will create an array of
        valid form schema instances using the passed array.
      </Text>

      <Section title="Example of usage">
        <EntireExample items={[FactorySchemasArraySchemaSource]} />
      </Section>
    </Section>
  </>
);

export default Factory;
