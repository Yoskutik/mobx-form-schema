import { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => (
  <footer className={styles.root}>
    <div className={styles.wrapper}>
      <span>Contributors are welcome! And God, I really need a designer.</span>
      <span>Copyright © 2022 Yoskutik</span>
    </div>
  </footer>
);
