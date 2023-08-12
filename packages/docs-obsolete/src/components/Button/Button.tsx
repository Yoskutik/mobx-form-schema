import React, { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import styles from '../Link/Link.module.scss';

type Props = ComponentProps<'button'> & {
  icon?: ReactElement;
}

export const Button = ({ icon, className, children, ...props }: Props) => (
  <button
    className={clsx(!children && icon && styles.round, className)}
    type="button"
    {...props}
  >
    {icon && (
      <span className={styles.icon}>{icon}</span>
    )}
    {children}
  </button>
);