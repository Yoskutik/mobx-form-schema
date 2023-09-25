import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { TextField } from '@components';
import { BasicSchema } from './BasicSchema';

const Info = observer(({ data, title }: { data: unknown, title: string }) => (
  <div style={{ marginTop: 12 }}>
    <b>{title}</b>
    <div style={{ marginTop: 4, whiteSpace: 'pre' }}>
      {JSON.stringify(data, undefined, 2)}
    </div>
  </div>
));

export const BasicExample = observer(() => {
  const schema = useMemo(() => BasicSchema.create(), []);

  return (
    <div>
      <TextField schema={schema} field="name" label="Name" />
      <TextField schema={schema} field="username" label="Username" />
      <Info title="Real values" data={schema} />
      <Info title="Presentation" data={schema.presentation} />
    </div>
  );
});
