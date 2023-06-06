import React, { ComponentProps, FC } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { HBox } from '../Boxes/Boxes';
import { Button } from './Button';
import styles from './ButtonFooter.module.scss';

type Props = {
  schema: FormSchema;
  save?: boolean;
  cancel?: boolean;
  submit?: boolean;
  className?: string;
  size?: ComponentProps<typeof Button>['size'];
  label?: string;
}

export const ButtonFooter: FC<Props> = observer(({ schema, save, cancel, submit, className, size, label }) => (
  <HBox alignItems="center" className={clsx(styles.buttons, className, styles[`size--${size}`])}>
    {label && (
      <span className={styles.label}>
        {label}:
      </span>
    )}
    {submit && (
      <Button variant="primary" type="submit" size={size}>
        Submit
      </Button>
    )}
    {save && (
      <Button variant="secondary" onClick={() => schema.sync()} disabled={!schema.isChanged} size={size}>
        Save locally
      </Button>
    )}
    {cancel && (
      <Button variant="cancel" onClick={() => schema.reset()} disabled={!schema.isChanged} size={size}>
        Reset
      </Button>
    )}
  </HBox>
));