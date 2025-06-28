import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseFilter from "./ExerciseFilter";
import ExercisesList from "./ExercisesList";
import ExerciseModal from "./ExerciseModal";
import imgHome from "../assets/Fondo-CaliZenics.png"
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
     <div
          className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgHome})` }}
        >
          <div className="w-full max-w-sm bg-[#2a2f38]/50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              Create Routine
            </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>
          <label className="block text-white font-medium">Routine Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Ej. Rutina rápida"
          />
        </div>

        <div>
          <label className="block text-white font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="warm-up">Warm-up</option>
            <option value="stretching">Stretching</option>
            <option value="full-body">Full-body</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-medium">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
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
      </div>
    </div>
  );
}