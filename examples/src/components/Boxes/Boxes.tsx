import { ComponentProps, FC } from 'react';
import clsx from 'clsx';
import styles from './Boxes.module.scss';

type Props = ComponentProps<'div'> & {
  alignItems?: 'start' | 'center' | 'end';
  justifyContent?:  'start' | 'center' | 'end';
};

export const HBox: FC<Props> = (props) => (
  <div
    {...props}
    className={
      clsx(
        props.className,
        styles.hbox,
        props.alignItems && styles[`align-${props.alignItems}`],
        props.justifyContent && styles[`justify-${props.justifyContent}`],
      )
    }
  />
);

export const VBox: FC<Props> = (props) => (
  <div
    {...props}
    className={
      clsx(
        props.className,
        styles.vbox,
        props.alignItems && styles[`align-${props.alignItems}`],
        props.justifyContent && styles[`justify-${props.justifyContent}`],
      )
    }
  />
);
