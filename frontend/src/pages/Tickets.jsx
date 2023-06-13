import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import Container from '../components/Container';
import TicketCard from '../components/TicketCard';
import useTicketsContext from '../hooks/useTicketsContext';

export default function Tickets() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const { tickets, dispatch } = useTicketsContext();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const res = await fetch('/api/tickets', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      pa;
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
    if (!user) {
      return;
    } else {
      fetchData();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (tickets) {
    return (
      <div className="flex items-center justify-center">
        <Container>
          <div className="flex items-center justify-center flex-col gap-9">
            <header className="flex flex-col gap-3 text-center items-center justify-center">
              <h1 className="text-3xl md:text-5xl">View Your Tickets</h1>
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
                <TicketCard url={'/tickets'} key={index} ticket={ticket} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
