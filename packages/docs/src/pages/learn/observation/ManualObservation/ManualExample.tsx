import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Button, TextField } from '@components';
import { SchemaObservationInfo } from '../SchemaObservationInfo';
import { ObservationButtons } from '../ObservationButtons';
import { BasicSchema } from '../BasicObservation/BasicSchema';

export const ManualExample = observer(() => {
  const schema = useMemo(() => BasicSchema.create({}, true), []);

  const handleSaveClick = () => {
    schema.sync();
  };

  const handleRestoreClick = () => {
    schema.reset();
  };

  const handleCheckNameClick = () => {
    schema.updateIsPropertyChanged('name');
  };

  const handleCheckAllClick = () => {
    schema.updateIsChangedAny();
  };

  return (
    <div>
      <TextField schema={schema} field="name" label="Name" />
      <TextField schema={schema} field="surname" label="Surname" />

      <div style={{ marginBottom: 12 }}>
        <Button onClick={handleCheckNameClick} variant="secondary" size="s">
          Check name
        </Button>
        <Button onClick={handleCheckAllClick} variant="secondary" size="s" style={{ marginLeft: 12 }}>
          Check all
        </Button>
      </div>

      <ObservationButtons
        onRestore={handleRestoreClick}
        onSave={handleSaveClick}
        schema={schema}
      />

      <SchemaObservationInfo schema={schema} />
    </div>
  );
});
