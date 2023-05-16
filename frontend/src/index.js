import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/authContext';
import { TicketsProvider } from './context/ticketContext';
import { AdminAuthProvider } from './context/adminAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <TicketsProvider>
          <App />
        </TicketsProvider>
      </AuthProvider>
    </AdminAuthProvider>
  </React.StrictMode>
);
