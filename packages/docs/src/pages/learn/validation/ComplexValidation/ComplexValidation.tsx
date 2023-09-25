import {
  Text,
  Section,
  EntireExample,
  Code,
  List,
  TextFieldSource,
  FieldBaseSource,
  CheckboxFieldSource,
} from '@components';
import ComplexExampleSource from 'source-loader!./ComplexExample';
import ComplexSchemaSource from 'source-loader!./ComplexSchema';
import ConditionalSchemaSource from 'source-loader!./ConditionalSchema';
import ConditionalExampleSource from 'source-loader!./ConditionalExample';
import { ComplexExample } from './ComplexExample';
import { ConditionalExample } from './ConditionalExample';

const ComplexValidation = () => (
  <>
    <Section title="Complex validation">
      <Text>
        Sometimes the validity of a certain field depends not only on the value of this field, but also
        on a value of some other field. For example, a value of <i>&quot;Confirm password&quot;</i> field
        must be the same as a value of <i>&quot;Password&quot;</i> field. Or if a form has separate
        fields for specifying a month and a year, you&apos;ll have  to take both values into account to
        understand is it happening before or after the desired date.
      </Text>

      <Text>
        Also, the validation may be conditional. For example, a form can contain an optional field for an
        email, and email validity must be checked only if the value is not empty. In addition, the
        condition can depend on other fields&apos; values.
      </Text>

      <Section title="Validation dependent on entire schema">
        <Text>Each validation rule takes 2 arguments.</Text>

        <List variant="ol">
          <li>The 1<sup>st</sup> one is a value of a field the rule was applied on.</li>
          <li>The 2<sup>nd</sup> one is an entire schema.</li>
        </List>

        <Text>
          So, if you want to create a validation rule, that should use a another value from a schema,
          you must simply use the second argument.
        </Text>

        <EntireExample items={[ComplexSchemaSource, ComplexExampleSource, TextFieldSource, FieldBaseSource]}>
          <ComplexExample />
        </EntireExample>
      </Section>

      <Section title="Conditional validation">
        <Text>
          You can write not only validation rules, but also validation conditions. The validation
          condition must be a function, that receives 2 parameters — the current value of the field
          and the entire schema — and returns a boolean that tells whether the validation must be
          applied or not.
        </Text>

        <Text>
          If a condition returns <Code>false</Code>, the property will be validated. If not, the
          validation is skipped, and the property is considered to be valid.
        </Text>

        <List variant="ol">
          <li>The 1<sup>st</sup> one is a value of a field the rule was applied on.</li>
          <li>The 2<sup>nd</sup> one is an entire schema.</li>
        </List>

        <Text>
          So, if you want to create a validation rule, that should use an another value from a schema,
          you must simply use the second argument.
        </Text>

        <Text>
          To start applying conditional validation, you have to use <Code>@validate.if</Code> decorator.
        </Text>

        <EntireExample
          items={[
            ConditionalSchemaSource,
            ConditionalExampleSource,
            TextFieldSource,
            CheckboxFieldSource,
            FieldBaseSource,
          ]}
        >
          <ConditionalExample />
        </EntireExample>
      </Section>

      <Section title="How does it update?">
        <Text>
          From the previous article, you knew that the validation in MobX Form Schema is applied
          using <Code>autorun</Code> function from MobX. Basically, it means that if the validation
          depends on some properties from the schema or if the validation condition depends on some
          properties from the schema, the validation will be recalculated each time any of those
          properties are changed. And you don&apos;t have to do it manually.
        </Text>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        But you may wonder, is there a way to disable such behavior of recalculating the validation
        each time and validate the form manually? There is one, and you can read about it in the
        next article.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default ComplexValidation;
