import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import useAuthContext from '../../hooks/useAuthContext';

export default function SingleTicket() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(json.error);
      }
      if (res.ok) {
        setLoading(false);
        setData(json);
      }
    };
    if (!user) {
      return;
    } else {
      fetchData();
    }
  }, [user]);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching data</p>;
  return (
    <div className="flex justify-center items-center">
      <Container>
        <div className="shadow bg-white p-6 gap-9 flex flex-col">
          <div className="justify-between flex items-start">
            <h1 className="capitalize font-semibold text-3xl md:text-5xl">
              {data.title}
            </h1>
            <p
              className={`px-2 py-1 rounded-xl h-fit ${
                data.active
                  ? 'bg-red-400 text-white'
                  : 'bg-green-300 text-black'
              }`}
            >
              {data.active ? 'Active' : 'Resolved'}
            </p>
          </div>
          <div className="w-full flex">
            <p>{data.description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
