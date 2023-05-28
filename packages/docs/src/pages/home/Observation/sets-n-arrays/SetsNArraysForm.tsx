import React, { useEffect, useMemo } from 'react';
import { Button, ChoiceField, HFlexBox, SchemaInformer } from '@components';
import { SetsNArraysSchema } from './SetsNArraysSchema';

export const SetsNArraysForm = () => {
  const schema = useMemo(() => (
    SetsNArraysSchema.create({
      skillSet: new Set(['JavaScript', 'HTML', 'CSS']),
      skillArray: ['JavaScript', 'HTML', 'CSS'],
    })
  ), []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(`Is form changed: ${schema.isChanged}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <ChoiceField schema={schema} field="skillSet" label="Skills as set" />
        <ChoiceField schema={schema} field="skillArray" label="Skills as array" />

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