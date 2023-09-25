import { Code, EntireExample, Highlighter, List, Section, Text } from '@components';
import validateSource from 'source-loader!./ValidateSchema';
import ValidateIfSchemaSource from 'source-loader!./ValidateIfSchema';
import validateIfDeclarationSource from 'source-loader!./validateIfDeclaration';
import validateDeclarationSource from 'source-loader!./validateDeclaration';
import styles from '../../Reference.module.scss';

const Validate = () => (
  <>
    <Section title={<>The <Code>@validate</Code> decorator</>}>
      <Text>
        The <Code>@validate</Code> decorator allows you to add some validation rules for desired properties
        in a schema. After you use this decorator, you can use the <Code>isValid</Code> in order to
        understand if the entire form is valid and the <Code>errors</Code> object in order to get a
        validation error message for each property separately.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        className={styles.referenceHighlighter}
        code={validateDeclarationSource.code}
      />

      <Section title="Validation rules">
        <Text>
          In order to use the <Code>@validate</Code> decorator, you have to pass validation rules. MobX Form
          Schema does not provide any out-of-box rules, so you have to create your own.
        </Text>

        <Text>
          Validation rule is a function, which takes receives 2 arguments:
        </Text>

        <List variant="ol">
          <li>A current value of a property;</li>
          <li>An entire schema.</li>
        </List>
      </Section>

      <Section title={<>Example of using the <Code>@validate</Code> decorator</>}>
        <EntireExample items={[validateSource]} />
      </Section>
    </Section>

    <Section title={<>The <Code>@validate.if</Code> decorator</>}>
      <Text>
        The <Code>@validate.if</Code> decorator works the same as <Code>@validate</Code>, but it
        also provides an opportunity to create a conditional validation.
      </Text>

      <Text>
        Sometimes you may want to stop the validation of a property. For example, there&apos;s no need
        to validate an empty optional field. And that&apos;s where conditional validation can help.
      </Text>

      <Text>
        API reference:
      </Text>

      <Highlighter
        code={validateIfDeclarationSource.code}
        className={styles.referenceHighlighter}
      />

      <Text>
        A validation condition rule receives the exact same arguments as validation rules.
      </Text>

      <Text>
        If a validation condition function returns <Code>false</Code>, the property is considered to be
        valid. If <Code>true</Code>, the validation is applied.
      </Text>

      <Section title={<>Example of using the <Code>@validate.if</Code> decorator</>}>
        <EntireExample items={[ValidateIfSchemaSource]} />
      </Section>
    </Section>
  </>
);

export default Validate;
