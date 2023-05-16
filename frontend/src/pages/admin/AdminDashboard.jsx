import Container from '../../components/Container';
import { useAdminLogout } from '../../hooks/useAdminLogout';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { adminLogout } = useAdminLogout();
  const navigate = useNavigate();

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
        </div>
      </Container>
    </div>
  );
}
