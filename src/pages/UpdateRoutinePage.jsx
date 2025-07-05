import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ExerciseFilter from "../components/ExerciseFilter";
import ExercisesList from "../components/ExercisesList";
import ExerciseModal from "../components/ExerciseModal";
import imgHome from "../assets/Fondo-CaliZenics.png";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";
function UpdateRoutinePage() {
  const { routineId } = useParams(); // rutina id desde la URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  //estados 
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("low");
  const [category, setCategory] = useState("stretching");
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  //ejercicios disponibles 
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/exercises`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const exercises = res.data;
        setAllExercises(exercises);
        setFilteredExercises(exercises);
        const uniqueTypes = Array.from(
          new Set(exercises.map((ex) => ex.category).filter(Boolean))
        );
        setExerciseTypes(uniqueTypes);
      })
      .catch((err) => console.error("Error al cargar ejercicios:", err));
  }, []);

  //datos de la rutina
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/routines/${routineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const { name, difficulty, category, exercises } = res.data;
        setName(name);
        setDifficulty(difficulty);
        setCategory(category);
        setSelectedIds(exercises.map((ex) => (ex._id ? ex._id : ex))); // por si vienen objetos o ids
      })
      .catch((err) => console.error("Error al cargar la rutina:", err))
      .finally(() => setLoading(false));
  }, [routineId]);

  //actualizar lista filtrada cada vez que cambia el filtro
  useEffect(() => {
    if (filterType === "all") {
      setFilteredExercises(allExercises);
    } else {
      setFilteredExercises(
        allExercises.filter((ex) => ex.category === filterType)
      );
    }
  }, [filterType, allExercises]);

  //seleccionar/deseleccionar ejercicio
  const toggleExercise = (eid) => {
    setSelectedIds((prev) =>
      prev.includes(eid) ? prev.filter((id) => id !== eid) : [...prev, eid]
    );
  };

  //updatecambios
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URL}/api/routines/${routineId}`,
        { name, category, difficulty, exercises: selectedIds },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => {
        alert("Rutina actualizada correctamente");
        navigate(`/${user._id}/routines`);
      })
      .catch((err) => {
        console.error("Error al actualizar rutina:", err.response?.data || err);
        alert("Error al actualizar rutina");
      });
  };

  if (!user || loading) {
    return <div className="text-white p-8">Loading…</div>;
  }

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      <div className="w-full max-w-sm bg-[#2a2f38]/50 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Edit Routine
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Filtro de ejercicios */}
          <ExerciseFilter
            types={exerciseTypes}
            selected={filterType}
            onSelect={setFilterType}
          />

          <div>
            <label className="block text-sm text-white font-medium mb-2">
              Ejercicios
            </label>
            <ExercisesList
              exercises={filteredExercises}
              selectedIds={selectedIds}
              toggleExercise={toggleExercise}
              onView={setSelectedExercise}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-900 to-indigo-400 active:brightness-125 transition duration-300 font-bold rounded-full py-2 text-white"
          >
            Guardar Cambios
          </button>
          <Link
            to={`/${user._id}/routines`}
            className="block text-center w-full bg-gradient-to-r from-red-950 to-red-300 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Cancel
          </Link>
        </form>

        {/* Modal de información del ejercicio */}
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      </div>
    </div>
  );
}


export default UpdateRoutinePage;