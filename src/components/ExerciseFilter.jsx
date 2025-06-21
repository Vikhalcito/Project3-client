
export default function ExerciseFilter({ types, selected, onSelect }) {
  return (
    <div>
      <span className="block text-sm font-medium mb-1">Filtrar por tipo</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect("all")}
          className={`px-3 py-1 rounded-full border ${
            selected === "all"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700"
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
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}