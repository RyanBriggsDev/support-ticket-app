import Container from '../../components/Container';
import { useAdminLogout } from '../../hooks/useAdminLogout';
import { useNavigate } from 'react-router-dom';
import TicketCard from '../../components/TicketCard';
import { useAdminContext } from '../../hooks/useAdminContext';

export default function AdminDashboard() {
  const { adminLogout } = useAdminLogout();
  const navigate = useNavigate();

  const admin = useAdminContext().admin;
  const { tickets } = admin;

  const handleLogout = async () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header>
            <h1 className="text-3xl md:text-5xl text-center">
              Admin Dashboard
            </h1>
          </header>
          <button
            className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-800 ease-in-out duration-300"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
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
