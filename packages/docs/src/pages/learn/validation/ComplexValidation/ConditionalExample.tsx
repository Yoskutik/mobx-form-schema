import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { CheckboxField, TextField } from '@components';
import { ConditionalSchema } from './ConditionalSchema';

export const ConditionalExample = observer(() => {
  const schema = useMemo(() => ConditionalSchema.create(), []);

  return (
    <div>
      <TextField schema={schema} field="email" type="email" label="E-mail" />
      <CheckboxField schema={schema} field="havePet" label="I have a pet" />
      {schema.havePet && (
        <TextField schema={schema} label="Pet's name" field="petName" required />
      )}
      <span>Is form valid: {schema.isValid.toString()}</span>
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        Form errors: {JSON.stringify(schema.errors, undefined, 2)}
      </pre>
    </div>
  );
});
