import { useAdminContext } from './useAdminContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useAdminCreateMessage = () => {
  const { admin } = useAdminContext();
  const { id } = useParams();
  const [createMessageError, setCreateMessageError] = useState(null);
  const [createMessageLoading, setCreateMessageLoading] = useState(null);
  const [newMessageData, setNewMessageData] = useState(null);

  const adminCreateMessage = async (message) => {
    setCreateMessageLoading(true);
    setCreateMessageError(null);
    const res = await fetch(`/api/admin/tickets/message/${id}`, {
      body: JSON.stringify({
        message,
        user: admin.adminId,
        userName: admin.name,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      setCreateMessageLoading(false);
      setCreateMessageError(json.error);
    }
    if (res.ok) {
      setCreateMessageLoading(false);
      setNewMessageData(json);
    }
  };
  return {
    adminCreateMessage,
    createMessageError,
    createMessageLoading,
    newMessageData,
  };
};
