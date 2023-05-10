import useAuthContext from './useAuthContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useCreateMessage = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [createMessageError, setCreateMessageError] = useState(null);
  const [createMessageLoading, setCreateMessageLoading] = useState(null);

  const createMessage = async (message) => {
    setCreateMessageLoading(true);
    setCreateMessageError(null);
    const res = await fetch(`/api/tickets/message/${id}`, {
      body: JSON.stringify({
        message,
        user: user.userId,
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
      setCreateMessageLoading(false);
      setCreateMessageError(json.error);
    }
    if (res.ok) {
      // dispatch to global state
      console.log('Success?');
      setCreateMessageLoading(false);
    }
  };
  return { createMessage, createMessageError, createMessageLoading };
};
