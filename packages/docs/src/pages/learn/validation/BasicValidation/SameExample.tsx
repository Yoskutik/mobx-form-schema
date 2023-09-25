import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { TextField } from '@components';
import { SameSchema1 } from './SameSchema1';

export const SameExample = observer(() => {
  const schema = useMemo(() => SameSchema1.create(), []);

  return (
    <div>
      <TextField schema={schema} field="email" type="email" required label="E-mail" />
      <span>Is form valid: {schema.isValid.toString()}</span>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        Form errors: {JSON.stringify(schema.errors, undefined, 2)}
      </pre>
    </div>
  );
});
