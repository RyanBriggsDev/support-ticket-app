import useAuthContext from '../hooks/useAuthContext';
import Container from '../components/Container';
import { Link } from 'react-router-dom';
import CreateTicketForm from '../components/CreateTicketForm';

export default function Home() {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <Container>
          <div className="flex items-center justify-center flex-col gap-9">
            <header className="flex items-center justify-center flex-col gap-9">
              <div className="text-center flex flex-col gap-3 items-center justify-center">
                <h1 className="text-3xl md:text-5xl">Support Ticket App</h1>
                <p>Welcome to the app! Please log in or sign up to continue.</p>
                <p>
                  {' '}
                  You'll then be able to raise a ticket for our team to review.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full">
                <Link
                  className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-800 ease-in-out duration-300 w-1/2 text-center"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-white px-3 py-2 text-black border-2 hover:text-white border-blue-800 rounded hover:bg-blue-800 ease-in-out duration-300 w-1/2 text-center"
                  to="/sign-up"
                >
                  Sign up
                </Link>
              </div>
            </header>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header className="flex flex-col gap-3 text-center items-center justify-center">
            <h1 className="text-3xl md:text-5xl">Welcome back, {user.name}!</h1>
            <p>Sorry to see you again, what's the problem?</p>
          </header>
          <CreateTicketForm />
        </div>
      </Container>
    </div>
  );
}
