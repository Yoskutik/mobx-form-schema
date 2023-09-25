import { observer } from 'mobx-react';
import { ChangeEvent, useMemo } from 'react';
import { action } from 'mobx';
import { SchemaObservationInfo } from '../SchemaObservationInfo';
import { ObservationButtons } from '../ObservationButtons';
import { CustomSchema } from './CustomSchema';

export const CustomExample = observer(() => {
  const schema = useMemo(() => CustomSchema.create(), []);

  const handleSaveClick = () => {
    schema.sync();
  };

  const handleRestoreClick = () => {
    schema.reset();
  };

  const handleNumberChange = action((evt: ChangeEvent) => {
    schema.data[0] = (evt.target as HTMLInputElement).valueAsNumber;
  });

  const handleTextChange = action((evt: ChangeEvent) => {
    schema.data[1] = (evt.target as HTMLInputElement).value;
  });

  return (
    <div>
      <input type="number" value={schema.data[0]} onChange={handleNumberChange} />
      <input type="text" value={schema.data[1]} onChange={handleTextChange} />

      <ObservationButtons
        onRestore={handleRestoreClick}
        onSave={handleSaveClick}
        schema={schema}
      />

      <SchemaObservationInfo schema={schema} />
    </div>
  );
});
