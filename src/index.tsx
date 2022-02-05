import 'reflect-metadata';
import React from 'react';
import { render } from 'react-dom';
import { App } from './views/App';
import { configure } from 'mobx';

configure({ enforceActions: 'never' });

render(<App />, document.getElementById('root'));
