import { observer } from 'mobx-react';
import { useState } from 'react';
import { Button } from '@components';
import { ComplexSchema } from './ComplexSchema';

const dataMock = {
  name: 'Joe',
  surname: 'Dough',
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fakeGetData = () => sleep(500).then(() => dataMock);

export const ComplexExample = observer(() => {
  const [schema, setSchema] = useState(() => ComplexSchema.create());

  const handleGetDataClick = () => fakeGetData()
    .then(data => setSchema(ComplexSchema.create(data)));

  return (
    <div>
      <div style={{ whiteSpace: 'pre' }}>
        {JSON.stringify(schema, undefined, 2)}
      </div>

      <div style={{ marginTop: 12 }}>
        <Button variant="primary" onClick={handleGetDataClick}>
          Get data
        </Button>
      </div>
    </div>
  );
});
