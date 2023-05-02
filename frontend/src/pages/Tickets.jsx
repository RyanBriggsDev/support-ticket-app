import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import Container from '../components/Container';
import TicketCard from '../components/TicketCard';

export default function Tickets() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      const res = await fetch('/api/tickets', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error);
        setLoading(false);
      }
      if (res.ok) {
        setData(json);
        setError(null);
        setLoading(false);
      }
    };
    if (!user) {
    } else {
      fetchData();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (data) {
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
              ${data.length === 1 && 'grid-cols-1'}
              ${data.length === 2 && 'grid-cols-1 md:grid-cols-2'}
              ${data.length >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}
              `}
            >
              {data.map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
