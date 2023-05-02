import { useState, useEffect } from 'react';
import { useCreateTicket } from '../hooks/useCreateTicket';

export default function CreateTicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isError, setIsError] = useState(false);
  const { loading, error, createTicket } = useCreateTicket();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(title, description);
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
    <div className="flex flex-col gap-3 w-1/2 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[500px] gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="font-bold">Title: </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1"
            placeholder="Give your support ticket a name."
            value={title}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold">Description: </label>
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 min-h-[100px]"
            placeholder="Describe your issue in detail so that we can look into it for you."
            value={description}
          />
        </div>
        <button
          className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-800 ease-in-out duration-300"
          disabled={loading}
        >
          Submit
        </button>
        {isError && (
          <p className="border border-red-500 text-black font-medium bg-red-100/50 px-3 py-2 rounded">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
