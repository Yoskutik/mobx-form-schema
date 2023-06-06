import { ComponentProps, FC } from 'react';
import clsx from 'clsx';
import styles from './Boxes.module.scss';

type Props = ComponentProps<'div'> & {
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?:  'start' | 'center' | 'end';
};

export const HBox: FC<Props> = ({ alignItems, justifyContent, className, ...props }) => (
  <div
    {...props}
    className={
      clsx(
        className,
        styles.hbox,
        alignItems && styles[`align-${alignItems}`],
        justifyContent && styles[`justify-${justifyContent}`],
      )
    }
  />
);

export const VBox: FC<Props> = ({ alignItems, justifyContent, className, ...props }) => (
  <div
    {...props}
    className={
      clsx(
        className,
        styles.vbox,
        alignItems && styles[`align-${alignItems}`],
        justifyContent && styles[`justify-${justifyContent}`],
      )
    }
  />
);
