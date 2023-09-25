import { observer } from 'mobx-react';
import { FormEvent, useMemo, useState } from 'react';
import { action } from 'mobx';
import { Button, TextField } from '@components';
import { ExperienceSchema } from './ExperienceSchema';
import { CVSchema } from './CVSchema';
import { ExperienceBlock } from './ExperienceBlock';
import styles from './CVExample.module.scss';
import { CVExampleInformer } from './CVExampleInformer';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CVExample = observer(() => {
  const [schema, setSchema] = useState(() => CVSchema.create());

  const restoreFromFakeApiClick = () =>
    sleep(500).then(() => {
      const rawData = sessionStorage.getItem('complete-example/raw');
      if (!rawData) {
        alert('State has\'t been saved yet');
        return;
      }
      const data = JSON.parse(rawData);
      setSchema(() => CVSchema.create(data));
    });

  const handleAddItemClick = action(() => {
    schema.experience.push(ExperienceSchema.create());
  });

  const handleDeleteItemClick = action((i: number) => {
    schema.experience.splice(i, 1);
  });

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const data = JSON.stringify(schema.presentation);
    sessionStorage.setItem('complete-example/raw', data);
    alert('State has been saved');
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} id="unique-form-id" onSubmit={handleSubmit} noValidate>
        <div className={styles.left}>
          <b className={styles.title}>Resume:</b>
          <TextField schema={schema} field="name" label="Name" />
          <TextField schema={schema} field="surname" label="Surname" />

          <div className={styles.contacts}>
            <b className={styles.title}>Contacts:</b>
            <TextField schema={schema.contacts} field="email" type="email" label="E-mail" />
            <TextField schema={schema.contacts} field="tel" type="tel" label="Phone number" />
          </div>
        </div>
        <div className={styles.experience}>
          <b className={styles.title}>Experience:</b>
          {schema.experience.map((item, i) => (
            <ExperienceBlock schema={item} onDelete={handleDeleteItemClick} key={item.id} index={i} />
          ))}
          <Button variant="secondary" onClick={handleAddItemClick} className={styles.addBtn}>
            Add experience block
          </Button>
        </div>
      </form>

      <div className={styles.buttons}>
        <Button variant="primary" onClick={() => schema.reset()} disabled={!schema.isChanged}>
          Restore locally
        </Button>
        <Button variant="primary" onClick={restoreFromFakeApiClick}>
          Restore from fake API
        </Button>
        <Button type="submit" form="unique-form-id" variant="primary">
          Save to fake API
        </Button>
      </div>

      <CVExampleInformer schema={schema} />
    </div>
  );
});
