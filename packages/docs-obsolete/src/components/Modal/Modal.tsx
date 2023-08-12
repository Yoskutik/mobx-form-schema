import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.scss';

type Props = {
  opened: boolean;
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

const root = document.getElementById('root');

export const Modal = ({ opened, children, className, onClose }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const ref = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (!opened) return undefined;

    ref.current.showModal();

    const wasHidden = root.getAttribute('aria-hidden') === 'true';
    if (wasHidden) return undefined;

    root.setAttribute('aria-hidden', 'true');
    return () => root.removeAttribute('aria-hidden');
  }, [opened]);

  if (!opened) return null;

  return (
    createPortal(
      <dialog ref={ref} className={clsx(styles.root, className)} onClose={onClose}>
        {children}
      </dialog>,
      document.body,
    )
  )
};