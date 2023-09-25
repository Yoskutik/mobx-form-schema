import { FormSchema } from '@yoskutik/mobx-form-schema';
import { observer } from 'mobx-react';
import { Button } from '@components';

type Props<T extends FormSchema> = {
  schema: T;
  onSave: () => void;
  onRestore: () => void;
};

export const ObservationButtons = observer(<T extends FormSchema>({ schema, onRestore, onSave }: Props<T>) => (
  <div style={{ marginTop: 12 }}>
    <Button variant="primary" onClick={onSave} disabled={!schema.isChanged}>
      Save
    </Button>
    <Button onClick={onRestore} disabled={!schema.isChanged} style={{ marginLeft: 12 }} variant="primary">
      Restore
    </Button>
  </div>
));
