import { observer } from 'mobx-react';
import { Button, CheckboxField, NumberField, TextField } from '@components';
import { Delete } from '../Delete';
import styles from './ExperienceBlock.module.scss';
import { ExperienceSchema } from './ExperienceSchema';

type Props = {
  schema: ExperienceSchema;
  onDelete: (index: number) => void;
  index: number;
};

export const ExperienceBlock = observer(({ schema, onDelete, index }: Props) => (
  <div className={styles.root}>
    <Button variant="secondary" onClick={() => onDelete(index)} size="s">
      <Delete />
    </Button>

    <div className={styles.body}>
      <b className={styles.title}>
        {index + 1}. {schema.company && `At ${schema.company}`}
      </b>

      <TextField schema={schema} field="position" label="Position" required />

      <TextField schema={schema} field="company" label="Company" required />

      <div className={styles.dates}>
        <NumberField schema={schema} field="startMonth" label="Start month" required className={styles.dateField} />
        <NumberField schema={schema} field="startYear" label="year" required className={styles.dateField} />
      </div>

      {!schema.stillWorkThere && (
        <div className={styles.dates}>
          <NumberField schema={schema} field="endMonth" label="End month" required className={styles.dateField} />
          <NumberField schema={schema} field="endYear" label="year" required className={styles.dateField} />
        </div>
      )}

      <CheckboxField schema={schema} field="stillWorkThere" label="Still work there" />
    </div>
  </div>
));
