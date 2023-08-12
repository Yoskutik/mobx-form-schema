import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import styles from '../Link/Link.module.scss';
import { Link } from '../Link/Link';

type LinkProps = ComponentProps<typeof Link>;

type Props = ComponentProps<'button'> & {
  icon?: ReactNode;
  buttonStyle?: LinkProps['linkStyle'];
  size?: 'm' | 's';
}

export const Button = ({ icon, className, children, size, buttonStyle, ...props }: Props) => (
  <button
    className={clsx(!children && icon && styles.round, size && styles[`size_${size}`], buttonStyle && styles[buttonStyle], className)}
    type="button"
    {...props}
  >
    {icon && (
      <span className={styles.icon}>{icon}</span>
    )}
    {children}
  </button>
);