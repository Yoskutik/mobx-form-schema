import React, { useMemo } from 'react';
import { TextField, SchemaInformer, HFlexBox } from '@components';
import { SimpleSchema } from './SimpleSchema';

export const SimpleForm = () => {
  const schema = useMemo(() => SimpleSchema.create(), []);

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
        <TextField schema={schema} field="name" label="Name" />
        <TextField schema={schema} field="email" label="E-mail" />

        <HFlexBox className="form-footer">
          <button type="submit">Submit</button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noChanged />
    </>
  );
}