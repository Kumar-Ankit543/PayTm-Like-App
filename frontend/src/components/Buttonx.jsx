export function Buttonx({ label }) {
  return (
    <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-md shadow-md hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out">
      {label}
    </button>
  );
}
