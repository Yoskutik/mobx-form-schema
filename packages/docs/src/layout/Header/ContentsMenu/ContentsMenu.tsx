import React, { useEffect, useRef } from 'react';
import { Modal, Button, TableOfContentsContent, Title, TableOfContentsLink } from '@components';
import { LEARN_TABLE_OF_CONTENTS_LINKS } from '@pages/learn/tableOfContententsLinks';
import { REFERENCE_TABLE_OF_CONTENTS_LINKS } from '@pages/reference/tableOfContententsLinks';
import styles from './ContentsMenu.module.scss';
import { GitHub } from '../GitHub';
import { NPM } from './NPM';
import { Close } from './Close';

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

export const ContentsMenu = ({ isOpened, onClose }: Props) => {
  const ref = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (!isOpened) return undefined;

    const dialog = ref.current;

    dialog.addEventListener('transitionend', ({ propertyName }) => {
      if (propertyName === 'transform' && dialog.classList.contains(styles.hidden)) {
        onClose();
      }
    });

    const handleCancel = (evt: Event) => {
      evt.preventDefault();
      dialog.classList.add(styles.hidden);
    };

    const handlePopState = () => {
      ref.current?.classList.add(styles.hidden);
    };

    dialog.addEventListener('cancel', handleCancel);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handlePopState);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [isOpened, onClose]);

  const handleCloseClick = () => {
    ref.current?.classList.add(styles.hidden);
  };

  return (
    <Modal opened={isOpened} onClose={onClose} mobileFullscreen className={styles.modal} ref={ref}>
      <Title variant="h3">Table of Contents</Title>

      <nav className={styles.nav}>
        <TableOfContentsLink to="/" className={styles.link} title="Main page" />
        <TableOfContentsLink to="/learn" className={styles.link} title="Learn MobX Form Schema" />
        <div className={styles.nestedBlock}>
          <TableOfContentsContent links={LEARN_TABLE_OF_CONTENTS_LINKS} />
        </div>
        <TableOfContentsLink
          to={REFERENCE_TABLE_OF_CONTENTS_LINKS[0][1][0].to}
          className={styles.link}
          title="Reference"
        />
        <div className={styles.nestedBlock}>
          <TableOfContentsContent links={REFERENCE_TABLE_OF_CONTENTS_LINKS} />
        </div>
      </nav>

      <Title variant="h4" className={styles.moreTitle}>More</Title>

      <nav className={styles.nav}>
        <TableOfContentsLink
          to="https://github.com/Yoskutik/mox-form-schema"
          title="GitHub Repository"
          className={styles.link}
          icon={<GitHub />}
        />
        <TableOfContentsLink
          to="https://www.npmjs.com/package/@yoskutik/mobx-form-schema"
          className={styles.link}
          title="NPM Package"
          icon={<NPM />}
        />
      </nav>

      <Button className={styles.closeButton} icon={<Close />} onClick={handleCloseClick} />
    </Modal>
  );
};
