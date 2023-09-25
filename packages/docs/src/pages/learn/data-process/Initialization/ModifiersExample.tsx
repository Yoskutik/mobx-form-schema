import { observer } from 'mobx-react';
import { useState } from 'react';
import { BasicSchema } from './BasicSchema';
import { Button } from '@components';
import { ModifiersSchema } from '@pages/learn/data-process/Initialization/ModifiersSchema';

const dataMock = {
  set: [0, 1, 2],
  nestedSchema: {
    prop1: 1,
  },
  nestedSchemasArray: [
    { prop1: 2 },
    { prop1: 3 },
  ],
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fakeGetData = () => sleep(500).then(() => dataMock);

export const ModifiersExample = observer(() => {
  const [schema, setSchema] = useState(() => ModifiersSchema.create());

  const handleGetDataClick = () => fakeGetData()
    .then(data => setSchema(ModifiersSchema.create(data)));

  return (
    <div>
      {Object.keys(schema).map(key => (
        <div key={key}>
          Constructor of "{key}" is {' '}
          {schema[key] !== undefined ? schema[key].constructor.name : 'not defined'}
        </div>
      ))}

      <div style={{ marginTop: 12 }}>
        <Button variant="primary" onClick={handleGetDataClick}>
          Get data
        </Button>
      </div>
    </div>
  );
});
