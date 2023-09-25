import { FC, ReactNode, useState, MouseEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import { A11yButton } from '../Button/A11yButton';
import styles from './EntireExample.module.scss';
import { Highlighter } from '../Highlighter/Highlighter';

type TFile = {
  code: string;
  filename: string;
};

type Props = {
  items: TFile[];
  children?: ReactNode;
  language?: 'tsx' | 'json' | 'bash';
  height?: number;
  className?: string;
};

export const EntireExample: FC<Props> = ({
  children,
  height = children ? 450 : 'initial',
  className,
  language,
  items,
}) => {
  const [chosenItem, setChosenItem] = useState(items[0]);

  const createTabFocusHandler = (it: TFile) => (evt: MouseEvent | FocusEvent) => {
    setChosenItem(it);

    const target = evt.target as HTMLDivElement;
    const parent = target.parentElement.parentElement as HTMLDivElement;

    parent.scroll({
      left: target.offsetLeft - parent.offsetLeft - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.vbox}>
        <div className={styles.tabContainerScrollable}>
          <div className={styles.tabContainer}>
            {items.map(it => (
              <A11yButton
                className={clsx(styles.tab, it === chosenItem && styles.active)}
                onFocus={createTabFocusHandler(it)}
                key={it.filename}
              >
                {it.filename}
              </A11yButton>
            ))}
            <span className={styles.normalizer} />
          </div>
        </div>
        <Highlighter
          style={{ height, minHeight: '100%', padding: children ? 12 : 16 }}
          code={chosenItem.code}
          language={language}
          forceShowCopy
        />
      </div>

      {children && (
        <div className={styles['right-side']}>
          {children}
        </div>
      )}
    </div>
  );
};
