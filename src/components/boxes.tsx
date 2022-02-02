import React, { CSSProperties, FC } from 'react';

type FlexBoxProps = {
  style?: CSSProperties;
  cls?: string;
  wrap?: boolean;
  justify?: 'space-between' | 'center' | 'right' | 'space-around',
};

const FlexBox: FC<FlexBoxProps & { type: 'v' | 'h' }> = ({ children, style, cls = '', wrap, type, justify }) => (
  <div style={style} className={`${cls} flex-box ${type} ${wrap ? 'wrap' : ''} ${justify ?? ''}`}>
    {children}
  </div>
);

export const HFlexBox: FC<FlexBoxProps> = props => <FlexBox type="h" {...props}/>;

export const VFlexBox: FC<FlexBoxProps> = props => <FlexBox type="v" {...props}/>;
