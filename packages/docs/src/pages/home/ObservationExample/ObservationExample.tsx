import { useMemo } from 'react';
import { Button, TextField, CheckboxField, ChoiceField } from '@components';
import { ObservationSchema } from './ObservationSchema';

export const ObservationExample = () => {
  const schema = useMemo(() => (
    ObservationSchema.create({
      field: 'pre-filled value',
      array: ['1', '2', '3'],
      set: new Set(['1', '2', '3']),
      nestedSchema: {
        field: 'pre-filled value',
      },
    })
  ), []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Is form changed: ${schema.checkAnyChanges()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField schema={schema} field="field" label="Regular field" />
      <ChoiceField schema={schema} field="array" label="Array of values" />
      <ChoiceField schema={schema} field="set" label="Set of values" />
      <TextField schema={schema.nestedSchema} field="field" label="Regular field of nested schema" />
      <Button type="submit" buttonStyle="primary">
        Submit
      </Button>
    </form>
  );
};