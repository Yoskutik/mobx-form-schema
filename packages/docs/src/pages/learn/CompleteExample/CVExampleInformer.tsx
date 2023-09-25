import { observer } from 'mobx-react';
import clsx from 'clsx';
import { CVSchema } from './CVSchema';
import styles from './CVExampleInformer.module.scss';

const Block = observer(({ title, data }: { title: string, data: unknown }) => (
  <div className={styles.item}>
    <b className={styles.title}>{title}</b>
    <div className={styles.pre}>
      {JSON.stringify(data, undefined, 2)}
    </div>
  </div>
));

type Props = {
  schema: CVSchema;
};

export const CVExampleInformer = observer(({ schema }: Props) => (
  <div className={styles.root}>
    <Block title="Current state" data={schema.presentation} />
    <div className={clsx(styles.item, styles.item_errors)}>
      <Block title="Errors main schema" data={schema.errors} />
      <Block title="Errors contacts schema" data={schema.contacts.errors} />
      {schema.experience.map((it, i) => (
        <Block title={`Errors experience[${i}] schema`} data={it.errors} key={it.id} />
      ))}
    </div>
  </div>
));
