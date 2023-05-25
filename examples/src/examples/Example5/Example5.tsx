import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { ChoiceField, NumberField, TextField, SchemaInformer, Button, Title, CheckboxField, ButtonFooter } from '@components';
import { useFormSchema } from '@utils';

import appStyles from '../../App.module.scss';

import { ExperienceItemSchema } from './CVFormSchema/ExperienceItemSchema';
import { CVFormSchema } from './CVFormSchema';
import styles from './Example5.module.scss';

type BlockProps = {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3';
}

const Block: FC<BlockProps> = ({ title, children, variant = 'h1', actions }) => (
  <>
    <Title className={styles.blockTitle} variant={variant}>
      {title}
      {actions && <div>{actions}</div>}
    </Title>
    <div className={styles.block}>
      {children}
    </div>
  </>
);

const BackgroundBlock: FC<{ schema: CVFormSchema }> = observer(({ schema }) => {
  const handleAddItemClick = action(() => {
    schema.experience.push(ExperienceItemSchema.create());
  });

  const deleteItem = action((i: number) => {
    schema.experience.splice(i, 1);
  });

  return (
    <Block title="Background">
      <ChoiceField schema={schema} field="skills" label="Skills" style={{ marginBottom: 0 }} />

      <Block title="Experience" variant="h2">
        {schema.experience.map((it, i) => (
          <Block
            actions={<Button variant="cancel" onClick={() => deleteItem(i)} size="s">Delete</Button>}
            title={`Experience ${it.companyName ? `at "${it.companyName}"` : 'block'}`}
            variant="h3"
            key={it.id}
          >
            <TextField schema={it} field="companyName" label="Company Name" />
            <TextField schema={it} field="position" label="Position" />
            <div className={styles.experienceBlock}>
              <NumberField schema={it} field="fromMonth" label="From month" />
              <NumberField schema={it} field="fromYear" label="From year" />
            </div>
            <CheckboxField schema={it} field="stillWorking" label="Still working there" />
            <div className={styles.experienceBlock}>
              <NumberField schema={it} field="toMonth" label="To month" disabled={it.stillWorking} />
              <NumberField schema={it} field="toYear" label="To year" disabled={it.stillWorking} />
            </div>
            <TextField schema={it} field="responsibilities" label="Responsibilities" />
          </Block>
        ))}

        <Button variant="secondary" onClick={handleAddItemClick} size="m" className={styles.addExperienceBlock}>
          Add experience block
        </Button>
      </Block>
    </Block>
  );
});

export const Example5 = observer(() => {
  const schema = useFormSchema(CVFormSchema);

  (window as any).sch = schema;

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!schema.isValid && !schema.experience.length) {
      alert('Please, provide some info about your experience.');
      return;
    }

    if (!schema.isValid) {
      alert('The form is not valid');
      return;
    }

    alert('The form is filled in and valid');
  };

  return (
    <div className={appStyles.example}>
      <form className={appStyles.form} autoComplete="off" onSubmit={handleSubmit}>
        <Block title="General information">
          <TextField schema={schema} field="name" label="Name" />
          <TextField schema={schema} field="surname" label="Surname" />
        </Block>

        <Block title="Contacts">
          <TextField schema={schema.contacts} field="email" label="E-mail" />
          <TextField schema={schema.contacts} field="tel" label="Phone number" />
          <TextField schema={schema.contacts} field="telegram" label="Telegram" />
          <TextField schema={schema.contacts} field="instagram" label="Instagram" />
        </Block>

        <BackgroundBlock schema={schema} />

        <ButtonFooter schema={schema} onCancel={() => schema.reset()} onSave={() => schema.sync()} />
      </form>

      <SchemaInformer schema={schema} title="General" />
    </div>
  );
});
