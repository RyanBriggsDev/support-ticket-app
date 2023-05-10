import useAuthContext from './useAuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCreateTicket = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const createTicket = async (title, description) => {
    setLoading(true);
    setError(null);
    const res = await fetch('/api/tickets/create', {
      body: JSON.stringify({
        title,
        description,
        userId: user.userId,
        userName: user.name,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      navigate('/tickets');
      // dispatch to global context
      setLoading(false);
    }
  };
  return { createTicket, error, loading };
};
