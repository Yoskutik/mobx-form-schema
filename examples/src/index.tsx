import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import React from 'react';

import { Example1 } from './examples/Example1/Example1';
import { Example2 } from './examples/Example2/Example2';
import { Example3 } from './examples/Example3/Example3';
import { Example4 } from './examples/Example4/Example4';
import { Example5 } from './examples/Example5/Example5';
import { Example6 } from './examples/Example6/Example6';

const App = () => (
  <>
    {/*<Example1 />*/}
    {/*<hr style={{ margin: '16px 0' }} />*/}
    {/*<Example2 />*/}
    {/*<hr style={{ margin: '16px 0' }} />*/}
    {/*<Example3 />*/}
    {/*<hr style={{ margin: '16px 0' }} />*/}
    {/*<Example4 />*/}
    {/*<hr style={{ margin: '16px 0' }} />*/}
    {/*<Example5 />*/}
    {/*<hr style={{ margin: '16px 0' }} />*/}
    <Example6 />
  </>
);

const div = document.createElement('div');
document.body.append(div);

createRoot(div).render(
  <App/>,
);
