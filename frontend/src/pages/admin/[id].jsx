import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { useAdminContext } from '../../hooks/useAdminContext';
import AdminTicketChat from '../../components/AdminTicketChat';
import { MuiSwitch } from '../../components/MuiSwitch';

export default function AdminSingleTicket() {
  const { admin } = useAdminContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [messageChange, setMessageChange] = useState(null);
  const [activeChange, setActiveChange] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/tickets/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(json.error);
        console.log(error);
      }
      if (res.ok) {
        setLoading(false);
        setData(json);
      }
    };
    if (!admin) {
      return;
    } else {
      fetchData();
    }
  }, [admin, messageChange, id, activeChange]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching data</p>;
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Container>
        <div className="shadow bg-white p-6 gap-9 flex flex-col rounded">
          <div className="justify-between flex flex-col md:flex-row gap-3 items-center text-center">
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
        </div>
      </Container>
      <AdminTicketChat
        messages={data.messages}
        setMessageChange={setMessageChange}
      />
      <MuiSwitch
        active={data.active}
        admin={admin}
        setActiveChange={setActiveChange}
        activeChange={activeChange}
      />
    </div>
  );
}
