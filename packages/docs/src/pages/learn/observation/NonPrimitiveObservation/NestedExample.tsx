import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { action } from 'mobx';
import { Button, TextField } from '@components';
import { SchemaObservationInfo } from '../SchemaObservationInfo';
import { ObservationButtons } from '../ObservationButtons';
import { Delete } from '../../Delete';
import { ExperienceSchema } from './ExperienceSchema';
import { CVSchema } from './CVSchema';
import styles from './NestedExample.module.scss';

export const NestedExample = observer(() => {
  const schema = useMemo(() => CVSchema.create(), []);

  const handleSaveClick = () => {
    schema.sync();
  };

  const handleRestoreClick = () => {
    schema.reset();
  };

  const handleAddItemClick = action(() => {
    schema.experience.push(ExperienceSchema.create());
  });

  const handleDeleteItemClick = action((i: number) => {
    schema.experience.splice(i, 1);
  });

  return (
    <div className={styles.root}>
      <form className={styles.form}>
        <b className={styles.experienceTitle}>Resume:</b>
        <TextField schema={schema} field="name" label="Name" />
        <TextField schema={schema} field="surname" label="Surname" />

        <div className={styles.contacts}>
          <b>Contacts:</b>
          <TextField schema={schema.contacts} field="email" type="email" label="E-mail" />
          <TextField schema={schema.contacts} field="tel" type="tel" label="Phone number" />
        </div>

        <div className={styles.experience}>
          <b>Experience:</b>
          {schema.experience.map((item, i) => (
            <div key={item.id} className={styles.experienceItem}>
              <Button variant="secondary" onClick={() => handleDeleteItemClick(i)} size="s">
                <Delete />
              </Button>
              <div className={styles.experienceItemBody}>
                <b className={styles.experienceTitle}>
                  {i + 1}. {item.company && `At ${item.company}`}
                </b>
                <TextField schema={item} field="position" label="Position" />
                <TextField schema={item} field="company" label="Company" />
              </div>
            </div>
          ))}
          <Button variant="secondary" size="s" onClick={handleAddItemClick} className={styles.addBtn}>
            Add experience block
          </Button>
        </div>

        <ObservationButtons
          onRestore={handleRestoreClick}
          onSave={handleSaveClick}
          schema={schema}
        />
      </form>

      <SchemaObservationInfo schema={schema} />
    </div>
  );
});
