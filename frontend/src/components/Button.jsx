export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-blue-600 px-3 py-2 text-white rounded hover:bg-blue-800 ease-in-out duration-300 text-center"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
}
