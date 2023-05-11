import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import { TicketsProvider } from './context/ticketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TicketsProvider>
        <App />
      </TicketsProvider>
    </AuthProvider>
  </React.StrictMode>
);
