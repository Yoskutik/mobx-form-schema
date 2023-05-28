import React, { useMemo } from 'react';
import { TextField, SchemaInformer, HFlexBox, Button } from '@components';
import { PresentationSchema } from './PresentationSchema';

export const PresentationForm = () => {
  const schema = useMemo(() => PresentationSchema.create(), []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(`Presentation: ${JSON.stringify(schema.presentation, undefined, 2)}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <TextField schema={schema} field="name" label="Name" />
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