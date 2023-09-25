import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Button, TextField } from '@components';
import { ComplexSchema } from '../ComplexValidation/ComplexSchema';

export const ManualExample = observer(() => {
  const schema = useMemo(() => ComplexSchema.create({}, true), []);

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
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button onClick={() => schema.updateIsPropertyValid('password')} variant="primary">
          Validate password
        </Button>
        <Button onClick={() => schema.updateIsValidAll()} variant="primary">
          Validate all
        </Button>
      </div>
      <span>Is form valid: {schema.isValid.toString()}</span>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        Form errors: {JSON.stringify(schema.errors, undefined, 2)}
      </pre>
    </div>
  );
});
