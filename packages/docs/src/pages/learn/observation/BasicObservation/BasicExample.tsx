import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { TextField } from '@components';
import { SchemaObservationInfo } from '../SchemaObservationInfo';
import { ObservationButtons } from '../ObservationButtons';
import { BasicSchema } from './BasicSchema';

export const BasicExample = observer(() => {
  const schema = useMemo(() => BasicSchema.create(), []);

  const handleSaveClick = () => {
    schema.sync();
  };

  const handleRestoreClick = () => {
    schema.reset();
  };

  return (
    <div>
      <TextField schema={schema} field="name" label="Name" />
      <TextField schema={schema} field="surname" label="Surname" />

      <ObservationButtons
        onRestore={handleRestoreClick}
        onSave={handleSaveClick}
        schema={schema}
      />

      <SchemaObservationInfo schema={schema} />
    </div>
  );
});
