import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { TextField } from '@components';
import { ComplexSchema } from './ComplexSchema';

export const ComplexExample = observer(() => {
  const schema = useMemo(() => ComplexSchema.create(), []);

  return (
    <div>
      <TextField schema={schema} field="password" type="password" required label="Password" />
      <TextField
        label="Confirm your password"
        field="confirmPassword"
        schema={schema}
        type="password"
        required
      />
      <span>Is form valid: {schema.isValid.toString()}</span>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        Form errors: {JSON.stringify(schema.errors, undefined, 2)}
      </pre>
    </div>
  );
});
