import React, { ComponentProps, ReactNode, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

export type ButtonSpecialProps = {
  variant?: 'primary' | 'secondary';
  size?: 'l' | 'm' | 's';
  icon?: ReactNode;
};

type Props = ComponentProps<'button'> & ButtonSpecialProps;

export const Button = ({ icon, className, children, size = 'm', variant, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  let isMounted = true;

  useLayoutEffect(() => () => {
    isMounted = false;
  }, []);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    const result = props.onClick?.(evt) as void | Promise<unknown>;

    if (result instanceof Promise) {
      setIsLoading(true);
      result.finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
    }
  };

  const cls = clsx(
    styles.button,
    !children && icon && styles.round,
    size && styles[`size_${size}`],
    variant && styles[variant],
    isLoading && styles.loading,
    className,
  );

  return (
    <button className={cls} type="button" {...props} onClick={handleClick}>
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader className={styles.loader} />
        </div>
      )}
      {icon && (
        <span className={styles.icon}>{icon}</span>
      )}
      {children}
    </button>
  );
};
