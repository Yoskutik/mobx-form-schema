import React, { DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Title.module.scss';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  variant: 'h1' | 'h2' | 'h3';
};

export const Title = forwardRef<HTMLHeadingElement, Props>(({ variant: Variant, ...props }, ref) => (
  <Variant {...props} className={clsx(props.className, styles[Variant])} ref={ref} />
));