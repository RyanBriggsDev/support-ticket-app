import Container from '../components/Container';
import { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header>
            <h1 className="text-3xl md:text-5xl">Login To Raise a Ticket</h1>
          </header>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-bold">Name: </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 rounded px-3 py-1"
                placeholder="Jim Bean"
                value={name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">Email: </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 rounded px-3 py-1"
                placeholder="jb@jimsbeans.com"
                value={email}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold">Password: </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 rounded px-3 py-1"
                placeholder="SuperSecurePassword"
                value={password}
              />
            </div>
            <button className="bg-blue-600 px-3 py-1 text-white rounded hover:bg-blue-800 ease-in-out duration-300">
              Submit
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
