import { Link as RRDLink, LinkProps } from 'react-router-dom';
import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import { ButtonSpecialProps } from '../Button/Button';
import buttonStyles from '../Button/Button.module.scss';
import styles from './Link.module.scss';

type Props = Omit<ComponentProps<typeof RRDLink>, 'to'> & ButtonSpecialProps & {
  isButton?: boolean;
  isActive?: boolean;
  to: string;
};

export const Link = ({
  icon,
  className,
  to,
  children,
  size = 'm',
  isButton = true,
  variant,
  isActive,
  ...props
}: Props) => {
  const cls = clsx(
    isButton && [
      buttonStyles.button,
      !children && icon && buttonStyles.round,
      buttonStyles[`size_${size}`],
      buttonStyles[variant],
    ],
    isActive && styles.active,
    className,
  );

  return (
    <RRDLink
      to={to}
      className={cls}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(to.startsWith('http') && {
        target: '_blank',
        rel: 'noreferrer',
      })}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {icon && (
        <span className={buttonStyles.icon}>{icon}</span>
      )}

      {children}
    </RRDLink>
  );
};
