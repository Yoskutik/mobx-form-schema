import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { ChoiceField } from '@components';
import { SchemaObservationInfo } from '../SchemaObservationInfo';
import { ObservationButtons } from '../ObservationButtons';
import { ArraySchema } from './ArraySchema';

export const ArrayExample = observer(() => {
  const schema = useMemo(() => ArraySchema.create(), []);

  const handleSaveClick = () => {
    schema.sync();
  };

  const handleRestoreClick = () => {
    schema.reset();
  };

  return (
    <div>
      <ChoiceField schema={schema} field="skillsArray" label="Skills as array" />
      <ChoiceField schema={schema} field="skillsSet" label="Skills as set" />

      <ObservationButtons
        onRestore={handleRestoreClick}
        onSave={handleSaveClick}
        schema={schema}
      />

      <SchemaObservationInfo schema={schema} />
    </div>
  );
});
