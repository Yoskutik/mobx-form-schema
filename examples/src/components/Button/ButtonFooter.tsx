import React, { ComponentProps, FC } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { FormSchema } from '@yoskutik/mobx-form-schema';
import { HBox } from '../Boxes/Boxes';
import { Button } from './Button';
import styles from './ButtonFooter.module.scss';

type Props<T> = {
  schema: T;
  save?: boolean;
  cancel?: boolean;
  submit?: boolean;
  className?: string;
  size?: ComponentProps<typeof Button>['size'];
  label?: string;
}

export const ButtonFooter = observer(<T extends FormSchema>({ schema, save, cancel, submit, className, size, label }: Props<T>) => (
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