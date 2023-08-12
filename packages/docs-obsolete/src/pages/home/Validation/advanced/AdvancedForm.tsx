import React, { useMemo } from 'react';
import { TextField, SchemaInformer, HFlexBox, Button } from '@components';
import { AdvancedSchema } from './AdvancedSchema';

export const AdvancedForm = () => {
  const schema = useMemo(() => AdvancedSchema.create(), []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(
      `Is form valid: ${schema.isValid}\n` +
      `Errors: ${JSON.stringify(schema.errors, undefined, 2)}`
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <TextField schema={schema} field="login" label="Login" />
        <TextField schema={schema} field="password" type="password" label="Password" />
        <TextField schema={schema} field="repeatedPassword" type="password" label="Repeat password" />

        <HFlexBox className="form-footer">
          <Button type="submit">Submit</Button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noChanged />
    </>
  );
}