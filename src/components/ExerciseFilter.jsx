
export default function ExerciseFilter({ types, selected, onSelect }) {
  return (
    <div>
      <span className="block text-white font-medium pb-2">Filtrar por tipo</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect("all")}
          className={`px-3 py-1 rounded-full border ${
            selected === "all"
              ? "bg-teal-600 text-white"
              : "bg-gray-700/50 text-gray-300"
          }`}
        >
          Todos
        </button>
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onSelect(t)}
            className={`px-3 py-1 rounded-full border ${
              selected === t
                ? "bg-teal-600 text-white"
                : "bg-gray-700/50 text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}