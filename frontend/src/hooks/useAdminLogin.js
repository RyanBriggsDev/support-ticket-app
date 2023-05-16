import { useState } from 'react';
import { useAdminContext } from './useAdminContext';

export const useAdminLogin = () => {
  const [adminError, setAdminError] = useState(null);
  const [adminLoading, setAdminLoading] = useState(null);
  const { agentDispatch } = useAdminContext();

  const adminLogin = async (email, password) => {
    setAdminLoading(true);
    setAdminError(null);
    const res = await fetch('/api/admin/login', {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    const json = await res.json();
    if (!res.ok) {
      setAdminLoading(false);
      setAdminError(json.error);
    } else {
      localStorage.setItem('admin', JSON.stringify(json));
      agentDispatch({ type: 'LOGIN', payload: json });
      setAdminLoading(false);
    }
  };
  return { adminLogin, adminLoading, adminError };
};
