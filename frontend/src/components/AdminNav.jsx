import { Link } from 'react-router-dom';
import Container from './Container';
import { useAdminContext } from '../hooks/useAdminContext';
import { useAdminLogout } from '../hooks/useAdminLogout';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const { admin } = useAdminContext();
  const navigate = useNavigate();
  const { adminLogout } = useAdminLogout();
  const handleLogout = () => {
    adminLogout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-center py-3">
      <Container>
        <div className="flex justify-between">
          <Link to={'/admin/dashboard'}>Admin Dashboard</Link>
          <Link
            to={'/'}
            className="md:pl-3 border-black hover:text-gray-500 hover:border-gray-500 duration-300 ease-in-out"
          >
            Support Ticket App
          </Link>
          <div id="nav-links" className="flex gap-3">
            {admin ? (
              <button onClick={() => handleLogout()}>Logout</button>
            ) : (
              <>
                <Link
                  className="md:pl-3 border-black hover:text-gray-500 hover:border-gray-500 duration-300 ease-in-out"
                  to={'/login'}
                >
                  Login
                </Link>
                <Link
                  className="md:border-l md:pl-3 border-black hover:text-gray-500 hover:border-gray-500 duration-300 ease-in-out"
                  to={'/sign-up'}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
