import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { view, ViewModel } from '@yoskutik/react-vvm';
import { action, makeObservable, observable } from 'mobx';
import { Code, FieldBaseSource, TextFieldSource, ChoiceFieldSource } from '@components';

import { EntireExample } from '../EntrireExample';
import { HomeBlock } from '../components';
import { BasicForm } from './basic/BasicForm';
import { PredefinedForm } from './predefined/PredefinedForm';
import { SetsNArraysForm } from './sets-n-arrays/SetsNArraysForm';
import { NestedSchemasForm } from './nested-schemas/NestedSchemasForm';

import BasicFormSource from 'source-loader!./basic/BasicForm';
import BasicSchemaSource from 'source-loader!./basic/BasicSchema';
import PredefinedFormSource from 'source-loader!./predefined/PredefinedForm';
import SetsNArraysFormSource from 'source-loader!./sets-n-arrays/SetsNArraysForm';
import SetsNArraysSchemaSource from 'source-loader!./sets-n-arrays/SetsNArraysSchema';
import NestedSchemasSchemaSource from 'source-loader!./nested-schemas/NestedSchemasSchema';
import NestedSchemasFormSource from 'source-loader!./nested-schemas/NestedSchemasForm';

const BasicDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      With <i>MobX Form Schema</i> you can <b>understand whether the content of your
      form is changed</b>. It can be useful, if you want to disable submit availability
      if the form is not changed. Simply apply <Code>@watch</Code> decorator to the
      fields you want to observe for changes.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      By the way, if you use <Code>@watch</Code>, the <Code>@observable</Code> will
      be applied automatically, so you don't need to use them both. But if you
      want to use any other observable modifier you must apply it explicitly, like
      so: <Code>@watch @observable.ref</Code>.
    </Typography>
  </>
);

const PredefinedDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      <b>It also works with predefined values</b>. And that's extremely helpful, if
      there's an option to edit forms with predefined values in your project.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      Also, with <Code>@watch</Code> decorator you can also restore your form into
      the initial state or save the current state as the initial - you can try
      clicking "Save" and "Restore" buttons in the example below.
    </Typography>
  </>
);

const SetsNArraysDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      You can observe not only primitive values, but also <b>sets or arrays</b> of
      primitive values. It can be useful, if you have fields for choosing several
      items. Simply apply <Code>@watch.set</Code> or <Code>@watch.array</Code> decorator
      to enable set or array observation.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      In the demo below you can try to add or delete some skills. In case of "Skills
      as set" field - it won't be considered changed as long as the final set contains
      all the values from the initial one. In case of "Skills as array" the items
      must be at the same position as they are in the initial array to be consider
      the same.
    </Typography>
  </>
);

const NestedSchemasDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      Actually, with <i>MobX Form Schema</i> you can always understand whether the
      form was changed and restore it to the initial state. Even, if you have
      complex structures in your schemas. You can just use one form schema inside
      another one.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      You can apply <Code>@watch.schema</Code> decorator, if you want to observe
      nested schema for changes. You can apply <Code>@watch.schemasArray</Code> decorator,
      if you want to observe an array of nested schema for changes.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      You can try the demo below. No matter how much data you add, delete or change,
      as long as the current state is the same as the initial one, the form will
      not be considered changed. You can try it yourself - for example, you can delete
      a block for last relative, add one, and then fill it with the same content.
    </Typography>
  </>
);

class ObserveItViewModel extends ViewModel {
  @observable toggleValue: 'basic' | 'predefined' | 'sets-n-arrays' | 'nested-schemas' = 'basic';

  @action handleToggleChange = (_evt: MouseEvent, value: this['toggleValue']) => {
    if (!value) return;
    this.toggleValue = value;
  }

  constructor() {
    super();
    makeObservable(this);
  }
}

export const ObserveIt = view(ObserveItViewModel)(({ viewModel }) => (
  <HomeBlock
    title="Observe it!"
    titleActions={(
      <ToggleButtonGroup value={viewModel.toggleValue} color="secondary" size="small" exclusive onChange={viewModel.handleToggleChange}>
        <ToggleButton value="basic">Basic</ToggleButton>
        <ToggleButton value="predefined">Predefined</ToggleButton>
        <ToggleButton value="sets-n-arrays">Sets & Arrays</ToggleButton>
        <ToggleButton value="nested-schemas">Nested schemas</ToggleButton>
      </ToggleButtonGroup>
    )}
  >
    {viewModel.toggleValue === 'basic' && <BasicDescription />}
    {viewModel.toggleValue === 'predefined' && <PredefinedDescription />}
    {viewModel.toggleValue === 'sets-n-arrays' && <SetsNArraysDescription />}
    {viewModel.toggleValue === 'nested-schemas' && <NestedSchemasDescription />}

    {['basic', 'predefined'].includes(viewModel.toggleValue) && (
      <EntireExample
        items={[
          BasicSchemaSource,
          viewModel.toggleValue === 'basic'
            ? BasicFormSource
            : PredefinedFormSource,
          TextFieldSource,
          FieldBaseSource,
        ]}
      >
        {viewModel.toggleValue === 'basic' ? <BasicForm /> : <PredefinedForm />}
      </EntireExample>
    )}

    {viewModel.toggleValue === 'sets-n-arrays' && (
      <EntireExample items={[SetsNArraysSchemaSource, SetsNArraysFormSource, ChoiceFieldSource, FieldBaseSource]}>
        <SetsNArraysForm />
      </EntireExample>
    )}

    {viewModel.toggleValue === 'nested-schemas' && (
      <EntireExample items={[NestedSchemasSchemaSource, NestedSchemasFormSource, TextFieldSource, FieldBaseSource]}>
        <NestedSchemasForm />
      </EntireExample>
    )}
  </HomeBlock>
))