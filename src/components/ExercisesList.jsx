export default function ExerciseList({exercises, selectedIds, toggleExercise, onView}) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto border p-3 rounded">
      {exercises.map((ex) => (
        <div key={ex._id} className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl">
          <label className="flex gap-2 items-start flex-1">
            <input
              type="checkbox"
              checked={selectedIds.includes(ex._id)}
              onChange={() => toggleExercise(ex._id)}
              className="mt-1 h-5 w-5"
            />
            <div>
              <span className="block text-white font-medium">{ex.name}</span>{" "}
              
              <p className="text-sm text-gray-500 line-clamp-2">
                {ex.description}
              </p>
            </div>
          </label>
          <span
                className={`text-xs px-2 py-0.5 rounded-full border ml-2 ${
                  ex.difficulty === "low"
                    ? "border-green-400 text-green-600"
                    : ex.difficulty === "medium"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-red-400 text-red-600"
                }`}
              >
                {ex.difficulty}
              </span>
          <button
            type="button"
            onClick={() => onView(ex)}
            className="text-sm text-indigo-600 hover:underline ml-2"
          >
            Ver más
          </button>
        </div>
      ))}
      {exercises.length === 0 && (
        <p className="text-gray-500 text-sm">
          No hay ejercicios para este tipo.
        </p>
      )}
    </div>
  );
}
