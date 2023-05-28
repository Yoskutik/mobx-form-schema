import React, { useMemo } from 'react';
import { Button, HFlexBox, SchemaInformer, TextField } from '@components';
import { DefaultSchema } from './DefaultSchema';

export const DefaultForm = () => {
  const schema = useMemo(() => (
    DefaultSchema.create({
      field2: 'Value from backend',
    })
  ), []);

  return (
    <>
      <form onSubmit={evt => evt.preventDefault()} style={{ marginBottom: 32 }}>
        <TextField schema={schema} field="field1" label="Field1"/>
        <TextField schema={schema} field="field2" label="Field2"/>

        <HFlexBox className="form-footer">
          <Button type="submit">Submit</Button>
        </HFlexBox>
      </form>

      <SchemaInformer schema={schema} noErrors noChanged />
    </>
  );
}