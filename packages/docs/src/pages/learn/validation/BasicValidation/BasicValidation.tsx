import { Text, Section, EntireExample, Code, List, TextFieldSource, FieldBaseSource } from '@components';
import ValidatorsSource from 'source-loader!../../LearnStartPage/validators';
import SameExampleSource from 'source-loader!./SameExample';
import SameSchema1Source from 'source-loader!./SameSchema1';
import SameSchema2Source from 'source-loader!./SameSchema2';
import SameSchema3Source from 'source-loader!./SameSchema3';
import { SameExample } from './SameExample';

const BasicValidation = () => (
  <>
    <Section title="Basic validation">
      <Text>
        MobX Form Schema provides great opportunities for form validation. And in this article we&apos;ll
        show you all you can do with the library.
      </Text>

      <Section title="Writting validation rules">
        <Text>
          Unlike other JavaScript libraries that provide the ability to configure form validation, MobX
          Form Schema doesn&apos;t provide any validation rules. There are several reasons for that:
        </Text>

        <List>
          <li>
            Validation rules may differ in different projects. For example, validation for email field
            may depend on a country for which you are developing your application. Therefore, if there
            are any rules delivered out of the box, there also must be an opportunity to overload them.
          </li>
          <li>
            Some applications may be multilingual, and with the rules out of the box, we would have
            to provide some functionality to overload the way of translating error messages.
          </li>
          <li>
            And what is most the important is that writing validation rules from the scratch can be
            extremely easy.
          </li>
        </List>

        <Text>
          In MobX Form Schema validation rule is a function, that returns a <b>boolean</b> or a <b>string</b>.
        </Text>

        <List>
          <li>
            If such a function returns <Code>false</Code>, the validation rule is considered passed.
          </li>
          <li>
            If it returns a string, validation is considered not passed, and the string&apos;s value is
            considered to be an error message for the field.
          </li>
          <li>
            If it returns <Code>true</Code>, there&apos;s no error message, but validation is not passed.
          </li>
        </List>

        <EntireExample items={[ValidatorsSource]} />
      </Section>

      <Section title="Validation example">
        <Text>
          To apply validation rules to a property, you must use <Code>@validation</Code> decorator.
        </Text>

        <Text>
          By default, all the validation in MobX Form Schema works only if a property in a class is
          observable. You can use <Code>makeObservable</Code> function or <Code>@observable</Code>
          decorators from MobX to make them observable. Also, you can use <Code>@watch</Code> decorator
          from this library, but be aware that using <Code>@watch</Code> decorators enables
          functionality for observing form changes.
        </Text>

        <Text>
          You can pass several rules into each property. In the example below, validation
          from <Code>email()</Code> validator will be checked only after validation
          from <Code>@required</Code> is passed.
        </Text>

        <EntireExample items={[SameSchema1Source, SameSchema2Source, SameSchema3Source]} />
      </Section>

      <Section title="Retrieving error message">
        <Text>
          All the errors of a schema are contained in <Code>errors</Code> property. If you want to understand
          whether specific property is valid or not you can see <Code>&lt;schema&gt;.errors.&lt;propertyName&gt;</Code>.
        </Text>

        <EntireExample
          items={[
            SameSchema1Source,
            SameExampleSource,
            TextFieldSource,
            FieldBaseSource,
          ]}
        >
          <SameExample />
        </EntireExample>
      </Section>

      <Section title="How does it update?">
        <Text>
          The validation in MobX Form Schema is applied using <Code>autorun</Code> function from MobX.
          Therefore, when any observable property that is used in a function is changed, the validation
          will be recalculated. Basically it means, that every time a property from a schema is changed
          its validation will be recalculated.
        </Text>
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        See how does how does work validation which depends on several properties, and how does conditional
        validation works in further sections.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default BasicValidation;
