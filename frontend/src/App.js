import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import { useAdminContext } from './hooks/useAdminContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Error404 from './pages/Error404';
import Tickets from './pages/Tickets';
import SingleTicket from './pages/tickets/[id]';
import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminSingleTicket from './pages/admin/[id]';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  const { user } = useAuthContext();
  const { admin } = useAdminContext();

  return (
    <div className="App flex flex-col justify-between min-h-screen bg-gray-100">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* user pages */}
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/:id" element={<SingleTicket />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={'/'} />}
          />
          <Route
            path="/sign-up"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          {/* admin pages */}
          <Route
            path="/admin/login"
            element={
              !admin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />
            }
          />
          <Route
            path="/admin/signup"
            element={
              !admin ? <AdminSignup /> : <Navigate to="/admin/dashboard" />
            }
          />
          <Route
            path="/admin/dashboard"
            element={!admin ? <AdminLogin /> : <AdminDashboard />}
          />
          <Route
            path="/admin/tickets/:id"
            element={!admin ? <AdminLogin /> : <AdminSingleTicket />}
          />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
