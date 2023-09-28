import clsx from 'clsx';
import { ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './TableOfContents.module.scss';
import { Link } from '../Link/Link';
import { Button } from '../Button/Button';
import { Chevron } from './Chevron';

type TLink = {
  title: string;
  to: string;
};

type TableOfContentsLinkProps = {
  title: string;
  to: string;
  icon?: ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export const TableOfContentsLink = ({ title, to, isActive, className, icon, onClick }: TableOfContentsLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={clsx(styles.link, className)}
    isActive={isActive}
    onClick={onClick}
    icon={icon}
    to={to}
  >
    {title}
  </Link>
);

type BlockProps = {
  data: Props['links'][number];
  isForceExpanded?: boolean;
  onLinkClick?: () => void;
};

const Block = ({ data, isForceExpanded, onLinkClick }: BlockProps) => {
  const [height, setHeight] = useState<undefined | number>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const { pathname } = useLocation();
  const id = useId();

  const isBlockActive = !!data[1].find(it => it.to === pathname);

  useLayoutEffect(() => {
    if (!listRef.current) return;
    setHeight(listRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    setIsExpanded(isBlockActive || isForceExpanded);
  }, [isBlockActive, isForceExpanded]);

  const [title, blockLinks] = data;
  const maxHeight = (isExpanded || height === undefined) ? height : 0;
  const buttonCls = clsx(styles.titleButton, isBlockActive && styles.active);

  return (
    <div className={clsx(styles.block, isExpanded && styles.block_expanded)}>
      {blockLinks.length === 1 ? (
        <TableOfContentsLink
          isActive={pathname === blockLinks[0].to}
          title={blockLinks[0].title}
          key={blockLinks[0].to}
          onClick={onLinkClick}
          className={buttonCls}
          to={blockLinks[0].to}
        />
      ) : (
        <>
          <Button
            onClick={() => setIsExpanded(state => !state)}
            aria-expanded={isExpanded ? 'true' : 'false'}
            className={buttonCls}
            aria-haspopup
            id={id}
          >
            {title}
            <Chevron className={clsx(styles.icon, !isExpanded && styles.iconReduced)} />
          </Button>
          <ul className={styles.linksList} aria-describedby={id} ref={listRef} style={{ maxHeight }}>
            {blockLinks.map(link => (
              <li key={link.to}>
                <TableOfContentsLink
                  isActive={pathname === link.to}
                  onClick={onLinkClick}
                  title={link.title}
                  to={link.to}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

type Props = {
  links: [string, TLink[]][],
  isForceExpanded?: boolean;
  onLinkClick?: () => void;
};

export const TableOfContentsContent = ({ links, isForceExpanded, onLinkClick }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
      {links.map(data => (
        <Block
          isForceExpanded={isForceExpanded || pathname === '/learn'}
          onLinkClick={onLinkClick}
          key={data[0]}
          data={data}
        />
      ))}
    </>
  );
};

export const TableOfContents = ({ links, isForceExpanded, onLinkClick }: Props) => (
  <aside className={styles.root}>
    <nav>
      <TableOfContentsContent links={links} isForceExpanded={isForceExpanded} onLinkClick={onLinkClick} />
    </nav>
  </aside>
);
