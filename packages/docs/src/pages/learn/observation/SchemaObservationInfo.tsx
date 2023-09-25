import { FormSchema } from '@yoskutik/mobx-form-schema';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import styles from './SchemaObservationInfo.module.scss';

type Props<T extends FormSchema> = {
  schema: T;
};

export const SchemaObservationInfo = observer(<T extends FormSchema>({ schema }: Props<T>) => {
  const stringify = (data: unknown) => {
    const jsData = toJS(data);
    return JSON.stringify(jsData instanceof Set ? [...jsData] : jsData, undefined, 2);
  };

  return (
    <div className={styles.root}>
      <span>Is form changed: {schema.isChanged.toString()}</span>

      <div className={styles.pre}>
        Changed properties: {stringify(schema.changedProperties)}
      </div>

      <div className={styles.pre}>
        Initial properties properties:
        {Object.keys(schema).map(property => (
          <div className={styles.preItem} key={property}>
            {property}: {stringify(schema.getInitial(property as any))}
          </div>
        ))}
      </div>
    </div>
  );
});
