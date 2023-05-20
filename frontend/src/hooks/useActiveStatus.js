import { useAdminContext } from './useAdminContext';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useActiveStatus = () => {
  const { admin } = useAdminContext();
  const { id } = useParams();
  const [activeStatusError, setActiveStatusError] = useState(null);
  const [activeStatusLoading, setActiveStatusLoading] = useState(false);
  const [newData, setNewData] = useState(null);

  const setActiveStatus = async (active) => {
    setActiveStatusLoading(true);
    setActiveStatusError(null);
    const res = await fetch(`/api/admin/tickets/${id}`, {
      body: JSON.stringify({ active: active }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${admin.token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      setActiveStatusLoading(false);
      setActiveStatusError(json.error);
    } else {
      setActiveStatusLoading(false);
      setNewData(json);
    }
  };
  return { setActiveStatus, activeStatusError, activeStatusLoading, newData };
};
