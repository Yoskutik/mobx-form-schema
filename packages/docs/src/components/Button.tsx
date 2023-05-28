import { ButtonHTMLAttributes } from 'react';
import { styled } from '@mui/material';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'm' | 's';
}

export const Button = styled('button')<Props>`
  padding: ${props => props.size === 'm' ? '4px 8px' : '2px 4px'};
  
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

Button.defaultProps = {
  type: 'button',
  size: 'm',
};