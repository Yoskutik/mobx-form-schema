import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import { PrismLight } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import React from 'react';
import './styles.scss';
import { App } from './layout';

PrismLight.registerLanguage('tsx', tsx);
PrismLight.registerLanguage('json', json);
PrismLight.registerLanguage('bash', bash);

createRoot(document.getElementById('root')).render(<App />);

const loader = document.getElementById('loader');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  loader.remove();
} else {
  loader.addEventListener('transitionend', () => loader.remove());
  loader.classList.add('hidden');
}
