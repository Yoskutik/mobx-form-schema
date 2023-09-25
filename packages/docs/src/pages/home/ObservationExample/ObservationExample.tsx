import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { Button, TextField, ChoiceField } from '@components';
import { Form } from '../Form/Form';
import { ObservationSchema } from './ObservationSchema';

export const ObservationExample = observer(() => {
  const schema = useMemo(() => ObservationSchema.create(), []);

  const handleSaveClick = () => {
    alert('Current state saved as initial');
    schema.sync();
  };

  const handleResetClick = () => schema.reset();

  return (
    <Form schema={schema} hideValidationInfo>
      <TextField schema={schema} field="basicString" label="String value" />
      <ChoiceField
        placeholder="Press 'Enter' or 'Space' to add item"
        label="Array of values"
        schema={schema}
        field="array"
      />
      <ChoiceField
        placeholder="Press 'Enter' or 'Space' to add item"
        label="Set of values"
        schema={schema}
        field="set"
      />
      <div>
        <Button variant="primary" disabled={!schema.isChanged} onClick={handleSaveClick}>Save</Button>
        <Button
          disabled={!schema.isChanged}
          onClick={handleResetClick}
          style={{ marginLeft: 10 }}
          variant="secondary"
        >
          Reset
        </Button>
      </div>
    </Form>
  );
});
