import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { view, ViewModel } from '@yoskutik/react-vvm';
import { action, makeObservable, observable } from 'mobx';
import { Code, DatetimeLocalFieldSource, FieldBaseSource, TextFieldSource } from '@components';

import { EntireExample } from '../EntrireExample';
import { HomeBlock } from '../components';
import { DefaultForm } from './default/DefaultForm';
import { TransformForm } from './transform/TransformForm';

import DefaultFormSource from 'source-loader!./default/DefaultForm';
import DefaultSchemaSource from 'source-loader!./default/DefaultSchema';
import TransformFormSource from 'source-loader!./transform/TransformForm';
import TransformSchemaSource from 'source-loader!./transform/TransformSchema';

const DefaultDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      With <i>MobX Form Schema</i> you can also tell how your form should be initialized
      with specific data. In the examples above you've already seen, how any form schema
      can be created with predefined values.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      In your schema you can set default values for your fields. And also you can pass
      the data into <Code>create</Code> static method.
    </Typography>
  </>
);

const WithTransformationDescription = () => (
  <>
    <Typography component="p" sx={{ mt: 4 }}>
      By default, all the data passed into <Code>create</Code> static method is applied
      into your form without any transformation. But it may be useful to transform the
      data from the server, so it become easier to handle it. For example, if you
      want to convert date ISO string into <Code>Date</Code> instance.
    </Typography>

    <Typography component="p" sx={{ mt: 2 }}>
      To add transform function for any property you should apply <Code>@factory</Code> decorator.
    </Typography>
  </>
);

class InitializeItViewModel extends ViewModel {
  @observable toggleValue: 'default' | 'with-transform' = 'default';

  @action handleToggleChange = (_evt: React.MouseEvent, value: this['toggleValue']) => {
    if (!value) return;
    this.toggleValue = value;
  }

  constructor() {
    super();
    makeObservable(this);
  }
}

export const InitializeIt = view(InitializeItViewModel)(({ viewModel }) => (
  <HomeBlock
    title="Initialize it!"
    titleActions={(
      <ToggleButtonGroup value={viewModel.toggleValue} color="secondary" size="small" exclusive onChange={viewModel.handleToggleChange}>
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="with-transform">With transformation</ToggleButton>
      </ToggleButtonGroup>
    )}
  >
    {viewModel.toggleValue === 'default' && <DefaultDescription />}

    {viewModel.toggleValue === 'with-transform' && <WithTransformationDescription />}

    {viewModel.toggleValue === 'default' && (
      <EntireExample items={[DefaultSchemaSource, DefaultFormSource, TextFieldSource, FieldBaseSource]}>
        <DefaultForm />
      </EntireExample>
    )}

    {viewModel.toggleValue === 'with-transform' && (
      <EntireExample items={[TransformSchemaSource, TransformFormSource, DatetimeLocalFieldSource, FieldBaseSource]}>
        <TransformForm />
      </EntireExample>
    )}
  </HomeBlock>
))