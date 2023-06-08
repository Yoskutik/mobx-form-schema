import { MouseEvent } from 'react';
import { action, makeObservable, observable } from 'mobx';
import { view, ViewModel } from '@yoskutik/react-vvm';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Code, TextFieldSource, FieldBaseSource, CheckboxFieldSource } from '@components';

import { HomeBlock } from '../components';
import { EntireExample } from '../EntrireExample';
import { AdvancedForm } from './advanced/AdvancedForm';
import { ConditionalForm } from './conditional/ConditionalForm';
import { SimpleForm } from './simple/SimpleForm';

import SimpleSchemaSource from 'source-loader!./simple/SimpleSchema';
import SimpleFormSource from 'source-loader!./simple/SimpleForm';
import AdvancedFormSource from 'source-loader!./advanced/AdvancedForm';
import AdvancedSchemaSource from 'source-loader!./advanced/AdvancedSchema';
import ConditionalSchemaSource from 'source-loader!./conditional/ConditionalSchema';
import ConditionalFormSource from 'source-loader!./conditional/ConditionalForm';
import ValidatorsSource from 'source-loader!./validators';

const SimpleDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      You can easily <b>apply any validation function</b> to any field of your form - just
      use <Code>@validate</Code> decorator. You can also apply <b>several functions</b> in
      order to get different error messages for different validation rules.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      You can not only <b>access the error messages</b> but also <b>understand whether the
      entire form is valid</b> or not.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      And the most cool part - the <b>validation is applied automatically</b>, when the value of the
      field is changed.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      You can look at the example below to see how MobX Form Schema can be used in React.
    </Typography>
  </>
);

const AdvancedDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      Inside a validation function you can use not just the current value, but actually
      also <b>entire form as well</b>. It is useful if the validation is depends on
      other field's value. For example, if you want to make sure that repeated password
      is equal to the original one.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      And it completely automatic as well. In the passwords example the validation will
      be applied whenever the password or repeated password is changed.
    </Typography>
  </>
);

const ConditionalDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      The validation <b>can be applied conditionally</b>. It can be useful in several cases,
      like turning off the validation for optional fields, if they don't have any value. As
      it works in the example below - the validation for <Code>email</Code> field will be
      applied only if it's not empty.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      And you can also <b>make the condition based on any other field</b> as well. It can be
      useful, if the condition is based on some other properties of your form. Just as it
      works in the example below - the validation for <Code>name</Code> field will be
      applied only when <i>"What to share name"</i> checkbox is checked.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      To enable conditional validation simply apply <Code>@validate(...).if</Code> decorator.
    </Typography>
  </>
);

class ValidateItViewModel extends ViewModel {
  @observable toggleValue: 'simple' | 'advanced' | 'conditional' = 'simple';

  @action handleToggleChange = (_evt: MouseEvent, value: this['toggleValue']) => {
    if (!value) return;
    this.toggleValue = value;
  }

  constructor() {
    super();
    makeObservable(this);
  }
}

export const ValidateIt = view(ValidateItViewModel)(({ viewModel }) => (
  <HomeBlock
    title="Validate it!"
    titleActions={(
      <ToggleButtonGroup value={viewModel.toggleValue} color="secondary" size="small" exclusive onChange={viewModel.handleToggleChange}>
        <ToggleButton value="simple">Simple</ToggleButton>
        <ToggleButton value="advanced">Advanced</ToggleButton>
        <ToggleButton value="conditional">Conditional</ToggleButton>
      </ToggleButtonGroup>
    )}
  >
    {viewModel.toggleValue === 'simple' && <SimpleDescription />}
    {viewModel.toggleValue === 'advanced' && <AdvancedDescription />}
    {viewModel.toggleValue === 'conditional' && <ConditionalDescription />}

    {viewModel.toggleValue === 'simple' && (
      <EntireExample
        items={[
          SimpleSchemaSource,
          SimpleFormSource,
          ValidatorsSource,
          TextFieldSource,
          FieldBaseSource,
        ]}
      >
        <SimpleForm />
      </EntireExample>
    )}

    {viewModel.toggleValue === 'advanced' && (
      <EntireExample
        items={[
          AdvancedSchemaSource,
          AdvancedFormSource,
          ValidatorsSource,
          TextFieldSource,
          FieldBaseSource,
        ]}
      >
        <AdvancedForm />
      </EntireExample>
    )}

    {viewModel.toggleValue === 'conditional' && (
      <EntireExample
        items={[
          ConditionalSchemaSource,
          ConditionalFormSource,
          ValidatorsSource,
          TextFieldSource,
          CheckboxFieldSource,
          FieldBaseSource,
        ]}
      >
        <ConditionalForm />
      </EntireExample>
    )}
  </HomeBlock>
))