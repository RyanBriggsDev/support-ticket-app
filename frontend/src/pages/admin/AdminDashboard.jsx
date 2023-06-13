import Container from '../../components/Container';
import TicketCard from '../../components/TicketCard';
import { useAdminContext } from '../../hooks/useAdminContext';
import useTicketsContext from '../../hooks/useTicketsContext';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const { admin } = useAdminContext();
  const { tickets, dispatch } = useTicketsContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const res = await fetch('/api/admin/tickets/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        setLoading(false);
      }
      if (res.ok) {
        setError(null);
        dispatch({ type: 'SET_TICKETS', payload: json });
        setLoading(false);
      }
    };
    if (!admin) {
      return;
    } else {
      fetchData();
    }
  }, [admin]);

  if (!admin || !tickets || loading) return <p>Loading...</p>;
  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header>
            <h1 className="text-3xl md:text-5xl text-center">
              Admin Dashboard
            </h1>
          </header>
          <div
            id="ticket-links"
            className={`grid w-full gap-3 
              ${tickets.length === 1 && 'grid-cols-1'}
              ${tickets.length === 2 && 'grid-cols-1 md:grid-cols-2'}
              ${
                tickets.length >= 3 &&
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }
              `}
          >
            {tickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} url={'/admin/tickets'} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
