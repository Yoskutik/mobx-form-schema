import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import {
  ChoiceField,
  NumberField,
  TextField,
  SchemaInformer,
  Button,
  Title,
  CheckboxField,
  ButtonFooter,
  VBox
} from '@components';
import { useFormSchema } from '@utils';

import appStyles from '../../App.module.scss';

import { ExperienceItemSchema } from './CVFormSchema/ExperienceItemSchema';
import { CVFormSchema } from './CVFormSchema';
import styles from './Example6.module.scss';

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
    <VBox className={styles.block}>
      {children}
    </VBox>
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
        {schema.experience.map((it, i) => {
          const title = `Experience ${it.companyName ? `at "${it.companyName}"` : 'block'}`;

          return (
            (
              <Block
                actions={<Button variant="cancel" onClick={() => deleteItem(i)} size="s">Delete</Button>}
                title={title}
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
                <ButtonFooter
                  className={styles.nestedButtons}
                  label={title}
                  schema={it}
                  size="s"
                  cancel
                  save
                />
              </Block>
            )
          );
        })}

        <Button variant="secondary" onClick={handleAddItemClick} size="m" className={styles.addExperienceBlock}>
          Add experience block
        </Button>
      </Block>
    </Block>
  );
});

export const Example6 = observer(() => {
  const schema = useFormSchema(CVFormSchema);

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
    <VBox className={appStyles.example}>
      <Title variant="h2" className={styles.mb8}>
        #6 Complete example
      </Title>

      <p className={styles.mb8}>
        This is a complete example of all MobX Form Schema. It's a CV form, which includes
        general information about employees, their contacts and their experience.
      </p>

      <p className={styles.mb8}>
        The <i>contacts</i> block is a separate schema, and it is used as nested schema here.
        Each field in contacts nested form is optional to fill. Although, there must apply
        a validation for any field, if it's non-empty. Also, if none of the contacts are
        given, the <code>contacts</code> property must be cut of the main schema.
      </p>

      <p className={styles.mb8}>
        The <i>experience</i> block is an array of schemas. Each experience schema has
        several required fields, such as <code>fromMonth</code>, <code>fromYear</code>, {' '}
        <code>responsibilities</code>, <code>companyName</code> and <code>position</code>. Also,
        if the flag <i>Still working there</i> is not in the <i>checked</i> state, properties
        {' '} <code>toMonth</code> and <code>toYear</code> must be required as well.
      </p>

      <p className={styles.mb8}>
        The <i>experience</i> block is an array, but the items of that array does not contain
        their identifier, which is needed for array render in React. Therefore,
        the <code>id</code> property was added to the experience schema. But due to the fact
        this property is the util, it must be cut of the schema's presentation.
      </p>

      <p className={styles.mb8}>
        Each schema - the main one, the contacts section and each of the experience schemas, -
        has the ability to be saved and restored from the saved state. You can try it on your
        own.
      </p>

      <div className={appStyles.exampleContent}>
        <form className={appStyles.form} autoComplete="off" onSubmit={handleSubmit}>
          <Block title="General information">
            <TextField schema={schema} field="name" label="Name" />
            <TextField schema={schema} field="surname" label="Surname" />
          </Block>

          <Block title="Contacts">
            <TextField schema={schema.contacts} field="email" label="E-mail" />
            <TextField schema={schema.contacts} field="telegram" label="Telegram" />
            <TextField schema={schema.contacts} field="instagram" label="Instagram" />
            <ButtonFooter
              className={styles.nestedButtons}
              schema={schema.contacts}
              label="Contacts"
              size="s"
              cancel
              save
            />
          </Block>

          <BackgroundBlock schema={schema} />

          <ButtonFooter schema={schema} save cancel submit />
        </form>

        <SchemaInformer schema={schema} title="General" />
      </div>
    </VBox>
  );
});
