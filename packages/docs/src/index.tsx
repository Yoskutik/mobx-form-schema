import 'reflect-metadata';
import { createRoot } from 'react-dom/client';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <div style={{
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Arial',
  }}>
    <h1>MobX Form Schema</h1>

    <p>
      Right now documentation is under construction
    </p>
  </div>,
);
