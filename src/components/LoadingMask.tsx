import React from 'react';
import { HBox } from './boxes';

const Spinner = () => (
    <svg className="spinner" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
    </svg>
);

export const LoadingMask = () => (
    <HBox style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.4)' }} justify="center">
        <Spinner/>
    </HBox>
);
