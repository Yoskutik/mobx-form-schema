import { observer } from 'mobx-react';
import { useState } from 'react';
import { BasicSchema } from './BasicSchema';
import { Button } from '@components';

const dataMock = {
  set: new Set([0, 1, 2]),
  date: new Date(),
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fakeGetData = () => sleep(500).then(() => dataMock);

export const BasicExample = observer(() => {
  const [schema, setSchema] = useState(() => BasicSchema.create());

  const handleGetDataClick = () => fakeGetData()
    .then(data => setSchema(BasicSchema.create(data)));

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
