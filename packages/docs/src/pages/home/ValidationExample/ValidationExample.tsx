import { useMemo } from 'react';
import { Button, TextField, CheckboxField } from '@components';
import { ValidationSchema } from './ValidationSchema';

export const ValidationExample = () => {
  const schema = useMemo(() => ValidationSchema.create(), []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(
      `Is form valid: ${!schema.validateAll()}\n` +
      (schema.isValid ? '' : `Errors: ${JSON.stringify(schema.errors, undefined, 2)}`)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField schema={schema} field="requiredField" label="Required field" />
      <TextField
        label="Option E-mail field"
        field="optionalEmail"
        schema={schema}
        type="email"
      />
      <TextField
        label="Required if checkbox is checked"
        field="checkboxDependentValue"
        schema={schema}
      />
      <CheckboxField label="Checkbox" field="checkbox" schema={schema} />
      <Button type="submit" buttonStyle="primary">
        Submit
      </Button>
    </form>
  );
};