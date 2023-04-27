import { useState } from 'react';
import useAuthContext from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/users/signup', {
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    const json = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setLoading(false);
    }
  };
  return { signup, loading, error };
};
