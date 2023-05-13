import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Error404 from './pages/Error404';
import Tickets from './pages/Tickets';
import SingleTicket from './pages/tickets/[id]';
import AgentLogin from './pages/agent/AgentLogin';
import AgentSignup from './pages/agent/AgentSignup';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  const { user } = useAuthContext();

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
          {/* agent pages */}
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/signup" element={<AgentSignup />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
