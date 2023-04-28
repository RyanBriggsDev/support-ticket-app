import Container from '../components/Container';
import { useLogin } from '../hooks/useLogin';
import { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    if (error) {
      setIsError(true);
      const time = setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center flex-col gap-9">
          <header>
            <h1 className="text-3xl md:text-5xl text-center">
              Login To Raise a Ticket
            </h1>
          </header>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-[500px] gap-3"
          >
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
            <button className="2" disabled={loading}>
              Submit
            </button>
            {isError && (
              <p className="border border-red-500 text-black font-medium bg-red-100/50 px-3 py-2 rounded">
                {error}
              </p>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
}
