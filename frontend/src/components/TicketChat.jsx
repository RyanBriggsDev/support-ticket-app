import Container from './Container';
import useAuthContext from '../hooks/useAuthContext';
import { useCreateMessage } from '../hooks/useCreateMessage';
import { BiSend } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function TicketChat({ messages, setMessageChange }) {
  const { user } = useAuthContext();

  return (
    <Container>
      <div className="shadow bg-white p-6 gap-9 flex flex-col rounded w-full">
        <div className="justify-between flex items-start flex-col gap-3">
          <div className="w-full flex flex-col gap-6">
            {messages.map((message, index) => (
              <div
                className={`w-full flex ${
                  message.user === user.userId ? 'justify-end' : 'justify-start'
                }`}
                key={index}
              >
                {message.user === user.userId ? (
                  // current user messages
                  <div className="flex flex-row gap-3 w-full justify-end">
                    <>
                      <div className="flex flex-col items-end text-end justify-center">
                        <p>{message.userName}</p>
                        <p className="text-sm">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p
                        className={`bg-blue-500 text-white py-2 px-3 rounded w-fit shadow`}
                      >
                        {message.message}
                      </p>
                    </>
                  </div>
                ) : (
                  // other messages
                  <div className="flex flex-row gap-3 w-full justify-start">
                    <>
                      <p
                        className={`bg-gray-200 text-black py-2 px-3 rounded w-fit shadow`}
                      >
                        {message.message}
                      </p>
                      <div className="flex flex-col items-start text-start justify-center">
                        <p>{message.userName}</p>
                        <p className="text-sm">
                          {formatDistanceToNow(new Date(message.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <MessageForm setMessageChange={setMessageChange} />
      </div>
    </Container>
  );
}

const MessageForm = ({ setMessageChange }) => {
  const { createMessage, createMessageError, createMessageLoading } =
    useCreateMessage();

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (error || createMessageError) {
      setIsError(true);
      const time = setTimeout(() => {
        setIsError(false);
        setError(null);
      }, 3000);
    }
  }, [error, createMessageError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      return setError('Please enter a message first.');
    }
    await createMessage(message);
    setMessageChange(message);
  };

  if (createMessageLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form className="flex flex-col gap-3">
      <div className="flex gap-3">
        <input
          className="bg-gray-200 py-2 px-3 rounded w-full text-black focus:outline-none shadow"
          type="text"
          placeholder="Write your message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <div
          className="text-white bg-blue-500 text-2xl flex items-center justify-center p-3 rounded cursor-pointer hover:bg-blue-800 ease-in-out duration-300"
          onClick={(e) => handleSubmit(e)}
        >
          <BiSend />
        </div>
      </div>
      {isError && error && (
        <p className="border border-red-500 text-black font-medium bg-red-100/50 px-3 py-2 rounded">
          {error}
        </p>
      )}
      {isError && createMessageError && (
        <p className="border border-red-500 text-black font-medium bg-red-100/50 px-3 py-2 rounded">
          {createMessageError}
        </p>
      )}
    </form>
  );
};
