import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { Button } from './Button';
import styles from './ButtonFooter.module.scss';

type Props = {
  schema: FormSchema;
  onSave?: () => void;
  onCancel?: () => void;
}

export const ButtonFooter: FC<Props> = observer(({ schema, onSave, onCancel }) => (
  <div className={styles.buttons}>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    {onSave && (
      <Button variant="secondary" onClick={onSave} disabled={!schema.isChanged}>
        Save locally
      </Button>
    )}
    {onCancel && (
      <Button variant="cancel" onClick={onCancel} disabled={!schema.isChanged}>
        Reset
      </Button>
    )}
  </div>
));