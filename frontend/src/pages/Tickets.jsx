import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';

export default function Tickets() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/tickets', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        console.log(json);
        setLoading(false);
      }
      if (res.ok) {
        setData(json);
        console.log(json);
        setError(null);
        setLoading(false);
      }
    };
    if (!user) {
      console.log('no user');
    } else {
      fetchData();
    }
  }, [user]);

  return <div>tickets</div>;
}
