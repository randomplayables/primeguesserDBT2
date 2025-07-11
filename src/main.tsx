import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);