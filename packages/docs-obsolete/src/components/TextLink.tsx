import { FC } from 'react';
import { Link } from '@mui/material';

type Props = {
  id?: string;
  page?: 'examples' | 'docs';
  href?: string;
  text?: string;
};

export const TextLink: FC<Props> = ({ text = 'Example', href, id, page = 'examples' }) => (
  <>
    {' '}
    <Link
      href={href ?? `#/${page}?heading=${id}`}
      {...(href?.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}
    >
      {text}
    </Link>
  </>
);
