import { Link as RRDLink, useLocation } from 'react-router-dom';
import React, { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Link.module.scss';

type TLinkStyle = 'primary' | 'secondary';

type Props = Omit<ComponentProps<typeof RRDLink>, 'to'> & {
  to: string;
  icon?: ReactElement;
  linkStyle?: TLinkStyle;
}

export const Link = ({ icon, className, to, children, linkStyle, ...props }: Props) => {
  const location = useLocation();

  return (
    <RRDLink
      to={to}
      className={clsx(!linkStyle && location.pathname === to && 'active', !children && icon && styles.round, styles[linkStyle], className)}
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