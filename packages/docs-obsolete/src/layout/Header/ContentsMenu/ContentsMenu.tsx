import React, { ReactElement, useEffect } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { Link } from '../../../components/Link/Link';
import styles from './ContentsMenu.module.scss'
import { GitHub, Close } from '@mui/icons-material';
import { Button } from '../../../components/Button/Button';

type BlockProps = {
  title: string;
  links: Array<{
    to: string;
    name: string | ReactElement;
    icon?: ReactElement;
  }>;
  onClick: () => void;
}

const Block = ({ title, links, onClick }: BlockProps) => (
  <div className={styles.block}>
    <h3 className={styles.header}>
      {title}
    </h3>
    <nav className={styles.nav}>
      {links.map(({ to, name, icon }) => (
        <Link to={to} className={styles.link} key={to} onClick={onClick} icon={icon}>
          {name}
        </Link>
      ))}
    </nav>
  </div>
);

type Props = {
  isOpened: boolean;
  onClose: () => void;
}

export const ContentsMenu = ({ isOpened, onClose }: Props) => {
  useEffect(() => {
    if (!isOpened) return undefined;

    window.addEventListener('popstate', onClose);
    return () => window.removeEventListener('popstate', onClose);
  }, [isOpened]);

  return (
    <Modal opened={isOpened} onClose={onClose}>
      <Block
        title="Learn Form Schema"
        onClick={onClose}
        links={[
          { to: '/learn/install', name: 'Installation' },
          { to: '/learn/start', name: 'Quick start' },
          { to: '/learn/validation', name: 'Form validation' },
          { to: '/learn/observation', name: 'Form observation' },
          { to: '/learn/factory', name: 'Form data preprocessing' },
          { to: '/learn/presentation', name: 'Form data presentation' },
          { to: '/learn/automation', name: 'Automation' },
        ]}
      />

      <Block
        title="API Reference"
        onClick={onClose}
        links={[
          { to: '/reference/form-schema', name: 'FormSchema' },
          { to: '/reference/validate', name: '@validate' },
          { to: '/reference/automate', name: '@automate' },
          { to: '/reference/watch', name: '@watch' },
          { to: '/reference/factory', name: '@factory' },
          { to: '/reference/presentation', name: '@presentation' },
        ]}
      />

      <Block
        title="Links"
        onClick={onClose}
        links={[
          {
            to: 'https://github.com/Yoskutik/form-schema',
            name: 'GitHub Repository',
            icon: <GitHub />
          },
          {
            to: 'https://www.npmjs.com/package/@yoskutik/form-schema',
            name: 'NPM Package',
            icon: <GitHub />,
          },
          // TODO Article?
        ]}
      />

      <Button className={styles.closeButton} icon={<Close />} onClick={onClose} />
    </Modal>
  );
};