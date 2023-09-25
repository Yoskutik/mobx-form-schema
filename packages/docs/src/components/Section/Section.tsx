import { ComponentProps, createContext, ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { Title } from '../Title/Title';
import styles from './Section.module.scss';

type Props = Omit<ComponentProps<'section'>, 'title'> & {
  title: ReactNode;
  forcedLevel?: TDepth;
};

type TDepth = 1 | 2 | 3 | 4 | 5;

const SectionContext = createContext<TDepth>(1);

export const Section = ({ title, forcedLevel, children, className, ...props }: Props) => {
  const hookDepth = useContext(SectionContext) + 1;
  const depth = forcedLevel || hookDepth;
  const variant = `h${depth}`;

  return (
    <section {...props} className={clsx(className, styles[variant])}>
      <Title variant={variant as 'h2' | 'h3' | 'h4' | 'h5'}>{title}</Title>
      <SectionContext.Provider value={depth as TDepth}>
        {children}
      </SectionContext.Provider>
    </section>
  );
};
