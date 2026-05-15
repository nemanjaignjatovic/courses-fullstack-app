import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import './styles/global.css';
import App from './App';
import { AuthProvider } from './presentation/auth/AuthContext';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found.');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
