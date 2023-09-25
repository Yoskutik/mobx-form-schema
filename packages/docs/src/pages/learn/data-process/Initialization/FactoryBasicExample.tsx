import { observer } from 'mobx-react';
import { useState } from 'react';
import { BasicSchema } from './BasicSchema';
import { Button } from '@components';
import { FactoryBasicSchema } from '@pages/learn/data-process/Initialization/FactoryBasicSchema';

const dataMock = {
  set: [0, 1, 2],
  date: '2023-01-01T00:00:00.000Z',
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fakeGetData = () => sleep(500).then(() => dataMock);

export const FactoryBasicExample = observer(() => {
  const [MainSchema, setMainSchema] = useState(() => BasicSchema);
  const [schema, setSchema] = useState(() => MainSchema.create());

  const handleGetDataClick = () => fakeGetData()
    .then(data => setSchema(MainSchema.create(data)));

  const handleSwitchClick = () => {
    setMainSchema(() => MainSchema === BasicSchema ? FactoryBasicSchema : BasicSchema);
  };

  return (
    <div>
      {Object.keys(schema).map(key => (
        <div key={key}>
          Constructor of "{key}" is {' '}
          {schema[key] !== undefined ? schema[key].constructor.name : 'not defined'}
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        Current schema: {MainSchema.name}
      </div>

      <div style={{ marginTop: 12 }}>
        <Button variant="primary" onClick={handleGetDataClick}>
          Get data
        </Button>
        <Button variant="primary" onClick={handleSwitchClick} style={{ marginLeft: 12 }}>
          Switch schemas
        </Button>
      </div>
    </div>
  );
});
