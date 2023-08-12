import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.scss';

type Props = {
  opened: boolean;
  children: ReactNode;
  className?: string;
  onClose: () => void;
  mobileFullscreen?: boolean;
}

const root = document.getElementById('root');

export const Modal = forwardRef<HTMLDialogElement, Props>(({ opened, children, className, onClose, mobileFullscreen }, forwardedRef) => {
  const [isShown, setIsShown] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  const handleRef = (element: HTMLDialogElement | null) => {
    ref.current = element;
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else {
      forwardedRef.current = element;
    }
  };

  useEffect(() => {
    if (!opened) return undefined;

    setTimeout(() => ref.current.showModal(), 25);

    const wasHidden = root.getAttribute('aria-hidden') === 'true';
    if (wasHidden) return undefined;

    root.setAttribute('aria-hidden', 'true');
    return () => root.removeAttribute('aria-hidden');
  }, [opened]);

  if (!opened) return null;

  return (
    <>
      {createPortal(
        <dialog ref={handleRef} className={clsx(styles.root, mobileFullscreen && styles.mobileFullscreen, className)} onClose={onClose}>
          {children}
        </dialog>,
        document.body,
      )}
    </>
  )
});