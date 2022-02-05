import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, VFC } from 'react';
import { container } from 'tsyringe';
import { ToastsService, TToast } from '@services';

const service = container.resolve(ToastsService);

export const Toast: VFC<{ data: TToast }> = ({ data }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2_000);
  }, [data]);

  return (
    <div
      className="toast"
      onTransitionEnd={() => !visible && service.data.shift()}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {data.text}
    </div>
  );
};

export const ToastsContainer = observer(() => (
  <>{!!service.data.length && <Toast data={service.data[0]} />}</>
));
