export function InputBox({ placeholder, input, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{input}</label>
      <input
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none focus:border-purple-400 transition duration-150 ease-in-out"
      />
    </div>
  );
}
