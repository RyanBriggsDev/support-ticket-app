import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminContext } from '../../hooks/useAdminContext';
import Container from '../../components/Container';
import AdminTicketChat from '../../components/AdminTicketChat';
import { useActiveStatus } from '../../hooks/useActiveStatus';
import Button from '../../components/Button';
import { useAdminCreateMessage } from '../../hooks/useAdminCreateMessage';

export default function AdminSingleTicket() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState(null);
  const { admin } = useAdminContext();

  const {
    setActiveStatus,
    activeStatusError,
    activeStatusLoading,
    newActiveData,
  } = useActiveStatus();

  const {
    adminCreateMessage,
    createMessageError,
    createMessageLoading,
    newMessageData,
  } = useAdminCreateMessage();

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
    if (res.ok) {
      setTicket(json);
      setLoading(false);
    } else {
      setError(json.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    setTicket(newActiveData);
  }, [newActiveData]);

  useEffect(() => {
    setTicket(newMessageData);
  }, [newMessageData]);

  const handleActiveChange = () => {
    setActiveStatus(!ticket.active);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching data</p>;

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Container>
        <div className="shadow bg-white p-6 gap-9 flex flex-col rounded">
          <div className="justify-between flex flex-col md:flex-row gap-3 items-center text-center">
            <h1 className="capitalize font-semibold text-3xl md:text-5xl">
              {ticket.title}
            </h1>
            <p
              className={`px-2 py-1 rounded-xl h-fit ${
                ticket.active
                  ? 'bg-red-400 text-white'
                  : 'bg-green-300 text-black'
              }`}
            >
              {ticket.active ? 'Active' : 'Resolved'}
            </p>
          </div>
        </div>
      </Container>
      <AdminTicketChat
        adminCreateMessage={adminCreateMessage}
        messages={ticket.messages}
        createMessageError={createMessageError}
        createMessageLoading={createMessageLoading}
      />
      {/* <Button onClick={() => handleActiveChange()}>
        {ticket.active ? 'Mark Resolved' : 'Mark Active'}
      </Button> */}
    </div>
  );
}
