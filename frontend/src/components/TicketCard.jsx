import { useNavigate } from 'react-router-dom';

export default function TicketCard({ ticket, url }) {
  console.log(ticket);
  const navigate = useNavigate();
  return (
    <div
      className="min-h-[150px] p-6 bg-white rounded-md shadow gap-6 flex flex-col items-start duration-300 ease-in-out hover:bg-gray-600 hover:text-white cursor-pointer"
      onClick={() => navigate(`${url}/${ticket._id}`)}
    >
      <div className="w-full flex justify-between gap-3">
        <h3 className="capitalize font-semibold">{ticket.title}</h3>
        <p
          className={`px-2 py-1 rounded-xl h-fit ${
            ticket.active ? 'bg-red-400 text-white' : 'bg-green-300 text-black'
          }`}
        >
          {ticket.active ? 'Active' : 'Resolved'}
        </p>
      </div>
      <p>{ticket.description}</p>
    </div>
  );
}
