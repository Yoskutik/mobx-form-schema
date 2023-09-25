import { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, ChoiceField, TextField } from '@components';
import { Form } from '../Form/Form';
import { BackendSchema } from './BackendSchema';

let orderInfo = {
  title: 'Pizza pepperoni',
  extraFeatures: [
    'Extra cheese',
    'Thin dough',
  ],
  email: 'yoskutik@gmail.com',
  name: 'Dima',
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fakeGetOrderInfo = () => sleep(1000).then(() => orderInfo);

const fakeSetOrderInfo = (info: typeof orderInfo) => sleep(1000).then(() => {
  orderInfo = info;
});

export const BackendExample = observer(() => {
  const [schema, setSchema] = useState(() => BackendSchema.create());

  const handleSaveClick = async () => {
    if (schema.isChanged) {
      await fakeSetOrderInfo(schema.presentation as typeof orderInfo).then(() => {
        alert('Order info is saved!');
        schema.sync();
      });

      return;
    }

    alert('The form is not changed');
  };

  const handleGetInfoClick = () => fakeGetOrderInfo()
    .then(data => setSchema(BackendSchema.create(data)));

  return (
    <Form schema={schema} hideValidationInfo>
      <TextField schema={schema} field="title" label="Product title" />
      <ChoiceField schema={schema} field="extraFeatures" label="Extra features" />
      <TextField schema={schema} field="name" label="Your name" />
      <TextField schema={schema} field="email" type="email" label="Your email" />
      <TextField schema={schema} field="email" type="email" label="Confirm your email" />
      <div>
        <Button variant="primary" onClick={handleSaveClick} disabled={!schema.isChanged}>
          Save info
        </Button>
        <Button variant="secondary" onClick={handleGetInfoClick} style={{ marginLeft: 10 }}>
          Get info
        </Button>
      </div>
    </Form>
  );
});
