import { Link as RRDLink, useLocation } from 'react-router-dom';
import React, { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Link.module.scss';

type Props = Omit<ComponentProps<typeof RRDLink>, 'to'> & {
  to: string;
  icon?: ReactElement;
}

export const Link = ({ icon, className, to, children, ...props }: Props) => {
  const location = useLocation();

  return (
    <RRDLink
      to={to}
      className={clsx(location.pathname === to && 'active', !children && icon && styles.round, className)}
      {...(to.startsWith('http') && {
        target: '_blank',
        rel: 'noreferrer',
      })}
      {...props}
    >
      {icon && (
        <span className={styles.icon}>{icon}</span>
      )}
      {children}
    </RRDLink>
  )
};