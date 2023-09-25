import { Loader } from './Loader';
import styles from './Loader.module.scss';

export const LoadingMask = () => (
  <div className={styles.mask}>
    <Loader className={styles.loader} />
  </div>
);
