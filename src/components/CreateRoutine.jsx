import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseFilter from "./ExerciseFilter";
import ExercisesList from "./ExercisesList";
import ExerciseModal from "./ExerciseModal";

const API_URL = "http://localhost:5005";

export default function RoutinePage() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("low");
  const [category, setCategory] = useState("stretching")

  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);


  useEffect(() => {
    axios
      .get(`${API_URL}/api/exercises`)
      .then((res) => {
        const exercises = res.data
        setAllExercises(exercises);
        setFilteredExercises(exercises);

        // 🆕 Extraer tipos únicos dinámicamente
        const uniqueTypes = Array.from(
          new Set(exercises.map((ex) => ex.category).filter(Boolean))
        );
        setExerciseTypes(uniqueTypes);
       
      })
      .catch((err) => console.error("Error al cargar ejercicios:", err));
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredExercises(allExercises);
    } else {
      setFilteredExercises(allExercises.filter((ex) => ex.category === filterType));
    }
  }, [filterType, allExercises]);

  const toggleExercise = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/api/routines`, { name, category, difficulty, exercises: selectedIds })
      .then(() => {
        alert("✅ Rutina creada correctamente");
        setName("");
        setDifficulty("beginner");
        setSelectedIds([]);
        setFilterType("all");
      })
      .catch((err) => {
        console.error("❌ Error al crear rutina:", err.response?.data || err);
        alert("Error al crear rutina");
      });
  };

  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-20 space-y-6 max-w-md mx-auto p-6 bg-white shadow rounded-xl"
      >
        <h2 className="text-2xl font-semibold">Create Routine</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Routine Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Ej. Rutina rápida"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="warm-up">Warm-up</option>
            <option value="stretching">Stretching</option>
            <option value="full-body">Full-body</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <ExerciseFilter
          types={exerciseTypes}
          selected={filterType}
          onSelect={setFilterType}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Ejercicios</label>
          <ExercisesList
            exercises={filteredExercises}
            selectedIds={selectedIds}
            toggleExercise={toggleExercise}
            onView={setSelectedExercise}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Guardar Rutina
        </button>
      </form>

      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
      />
    </>
  );
}