import { Text, Section, EntireExample, Code, List } from '@components';
import ArrayExampleSource from 'source-loader!./ArrayExample';
import ArraySchemaSource from 'source-loader!./ArraySchema';
import CVSchemaSource from 'source-loader!./CVSchema';
import ContactsSchemaSource from 'source-loader!./ContactsSchema';
import ExperienceSchemaSource from 'source-loader!./ExperienceSchema';
import NestedExampleSource from 'source-loader!./NestedExample';
import SchemaObservationInfoSource from 'source-loader!../SchemaObservationInfo';
import { NestedExample } from './NestedExample';
import { ArrayExample } from './ArrayExample';

const NonPrimitiveObservation = () => (
  <>
    <Section title="Form observation with non-primitive values">
      <Text>
        Sometimes using primitive values like boolean values, strings or numbers may be not enough for
        project&apos; needs. For example, there can be a multi-select field and the best way to store
        data for such field is an array or a set.
      </Text>

      <Text>
        Although, as it was said in the previous article plain <Code>@watch</Code> decorator works
        well only with primitive values, there is a solution for such need. You can
        use <Code>@watch</Code> decorators modifiers.
      </Text>

      <Text>
        These are <Code>@watch</Code> decorators modifiers:
      </Text>

      <List>
        <li>With <Code>@watch.array</Code> you can observe arrays of primitive values;</li>
        <li>With <Code>@watch.set</Code> you can observe sets of primitive values;</li>
        <li>With <Code>@watch.schema</Code> you can observe nested form schemas;</li>
        <li>With <Code>@watch.schemasArray</Code> you can observe arrays of nested form schemas.</li>
      </List>

      <Section title="Observing sets and and arrays">
        <Text>
          If you apply <Code>@watch.array</Code> or <Code>@watch.set</Code> decorators to a property,
          it will automatically decorate the property with <Code>observable.shallow</Code>. Although,
          you can freely reassign it to any other observation from MobX.
        </Text>

        <Text>
          Look at the example below. The <i>&quot;Skills as array&quot;</i> field will be considered
          unchanged only if it contains the exact same values in the exact same order as they were in
          the initial state. While for <i>&quot;Skills as set&quot;</i> field, it is enough to have
          the same values with no dependency on their positioning.
        </Text>

        <EntireExample items={[ArraySchemaSource, ArrayExampleSource, SchemaObservationInfoSource]}>
          <ArrayExample />
        </EntireExample>
      </Section>

      <Section title="Observing nested form schemas">
        <Text>
          Each field in a form must be a separate property in a schema. Therefore, if you have a few
          dozen or even hundreds of fields, the size of a form schema can grow dramatically. But you
          can logically combine some of the fields into groups, and such groups can be separated form
          schemas. For example, in a CV form contacts block can be a separate form schema.
        </Text>

        <Text>
          And if you need to understand whether an entire form is changed, but some fields in this form
          are contained in separate schemas, all you have to do is make such schemas nested.
        </Text>

        <Text>
          In the example below, you can see several nested schemas. And even though this form is quite
          large, you can always understand whether it has been changed or not. Even if you change data
          in the <i>&quot;Contacts&quot;</i> section. Even if you delete an experience item, create a
          new one and fill it in with the same data. And of course, you can restore and save the form
          schema entirely. And all this functionality is achieved with only a few decorators.
        </Text>

        <EntireExample
          items={[
            CVSchemaSource,
            ContactsSchemaSource,
            ExperienceSchemaSource,
            NestedExampleSource,
            SchemaObservationInfoSource,
          ]}
          height={450}
        />

        <NestedExample />
      </Section>
    </Section>

    <Section title="Next" forcedLevel={3}>
      <Text>
        The described modifiers of <Code>@watch</Code> decorator can cover most of your needs. But if
        you have an unusual task, you can create your own decorator and tell the schema how the current
        state of a property should be compared with the initial one. Read about it next.
      </Text>
    </Section>
  </>
);

// eslint-disable-next-line import/no-default-export
export default NonPrimitiveObservation;
