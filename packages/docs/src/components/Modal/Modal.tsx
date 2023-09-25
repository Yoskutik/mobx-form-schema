import React, { forwardRef, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.scss';

const SCROLLBAR_WIDTH = (() => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';

  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
})();

type Props = {
  opened: boolean;
  children: ReactNode;
  className?: string;
  onClose: () => void;
  mobileFullscreen?: boolean;
};

const root = document.getElementById('root');
const html = document.querySelector('html');

const blockScroll = () => {
  requestAnimationFrame(() => {
    const hasScroll = html.offsetHeight > window.innerHeight;
    html.style.overflow = 'hidden';
    if (hasScroll) {
      document.body.style.paddingRight = `${SCROLLBAR_WIDTH}px`;
    }
  });

  return () => {
    requestAnimationFrame(() => {
      html.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    });
  };
};

export const Modal = forwardRef<HTMLDialogElement, Props>(({
  opened,
  children,
  className,
  onClose,
  mobileFullscreen,
}, forwardedRef) => {
  const ref = useRef<HTMLDialogElement>(null);

  const handleRef = (element: HTMLDialogElement | null) => {
    ref.current = element;
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else {
      // eslint-disable-next-line no-param-reassign
      forwardedRef.current = element;
    }
  };

  useEffect(() => {
    if (!opened) return undefined;

    window.history.pushState('', '', `${window.location.hash || '#/'}?modal-opened=1`);
    setTimeout(() => ref.current.showModal(), 25);

    const wasHidden = root.getAttribute('aria-hidden') === 'true';
    if (wasHidden) return undefined;

    root.setAttribute('aria-hidden', 'true');

    const resetBlockScroll = blockScroll();

    return () => {
      if (window.location.hash.includes('?modal-opened=1')) {
        window.history.back();
      }

      root.removeAttribute('aria-hidden');
      resetBlockScroll();
    };
  }, [opened]);

  if (!opened) return null;

  return (
    <>
      {createPortal(
        <dialog
          className={clsx(styles.root, mobileFullscreen && styles.mobileFullscreen, className)}
          onClose={onClose}
          ref={handleRef}
        >
          {children}
        </dialog>,
        document.body,
      )}
    </>
  );
});
