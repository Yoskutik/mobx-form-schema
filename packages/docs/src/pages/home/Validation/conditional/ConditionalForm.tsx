import React, { useMemo } from 'react';
import { TextField, SchemaInformer, CheckboxField, HFlexBox } from '@components';
import { ConditionalSchema } from './ConditionalSchema';

export const ConditionalForm = () => {
  const schema = useMemo(() => ConditionalSchema.create(), []);

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
        <CheckboxField schema={schema} field="wantToShareName" label="Want to share name" />

        <HFlexBox className="form-footer">
          <button type="submit">Submit</button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noChanged />
    </>
  );
}