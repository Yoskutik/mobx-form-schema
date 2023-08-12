import React, { useMemo } from 'react';
import { Button, HFlexBox, SchemaInformer, TextField } from '@components';
import { BasicSchema } from './BasicSchema';

export const BasicForm = () => {
  const schema = useMemo(() => BasicSchema.create(), []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(`Is form changed: ${schema.isChanged}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <TextField schema={schema} field="name" label="Name" />
        <TextField schema={schema} field="surname" label="Surname" />
        <TextField schema={schema} field="email" label="E-mail" />

        <HFlexBox className="form-footer">
          <Button type="submit">Submit</Button>
          <Button onClick={() => schema.sync()}>Save</Button>
          <Button onClick={() => schema.reset()}>Restore</Button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noErrors />
    </>
  );
}