const RoleSelector = ({ onSelect }) => (
  <div className="flex justify-center gap-4">
    <button
      onClick={() => onSelect("A")}
      className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow"
    >
      Join as Speaker A (Voice)
    </button>
    <button
      onClick={() => onSelect("B")}
      className="bg-green-500 text-white px-6 py-2 rounded-xl shadow"
    >
      Join as Speaker B (Text)
    </button>
  </div>
);

export default RoleSelector;
