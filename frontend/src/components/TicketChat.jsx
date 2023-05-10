import Container from './Container';
import useAuthContext from '../hooks/useAuthContext';

export default function TicketChat({ messages }) {
  const { user } = useAuthContext();

  return (
    <Container>
      <div className="shadow bg-white p-6 gap-9 flex flex-col rounded w-full">
        <div className="justify-between flex items-start flex-col gap-3">
          <div className="w-full flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                className={`w-full flex ${
                  message.user === user.userId ? 'justify-end' : 'justify-start'
                }`}
                key={index}
              >
                <p
                  className={`${
                    message.user === user.userId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  } py-2 px-3 rounded w-fit shadow`}
                >
                  {message.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
