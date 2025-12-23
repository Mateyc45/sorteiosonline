import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

// ADICIONE ESTA LINHA AQUI:
import '@fontsource/inter/400.css'; // Peso normal
import '@fontsource/inter/600.css'; // Peso semi-bold
import '@fontsource/inter/700.css'; // Peso bold

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);