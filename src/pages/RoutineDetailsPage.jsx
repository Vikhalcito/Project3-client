import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { AuthContext } from "../context/auth.context";

//const API_URL = "http://localhost:5005";
const API_URL = "https://calizenics-server.onrender.com";

function RoutineDetailsPage() {
  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);

  const { user, isLoading } = useContext(AuthContext);
  const { routineId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/routines/${routineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const userRoutine = res.data;
        setRoutine(userRoutine);
        setExercises(userRoutine.exercises);
      })
      .catch((err) => console.error("Error al cargar ejercicios:", err));
  }, []);

  if (isLoading || !routine) {
    return <div className="pt-32 text-white">Cargando…</div>;
  }

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="text-center bg-gray-900 bg-opacity-60 py-3 px-6 rounded-xl mb-4 mx-auto">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 text-5xl font-extrabold font-title tracking-wide">
          {routine.name}
        </h1>
      </div>
      <div className="inline-flex flex-col items-center bg-gray-900/40 py-6 px-6 rounded-xl justify-center mb-4 w-full">
        {routine.description && (
          <div className="bg-gray-900/70 rounded-xl p-4 my-2 shadow-md text-white hover:shadow-xl transition">
            <div className="prose prose-invert max-w-none text-white text-center mb-10">
              <ReactMarkdown>{routine.description}</ReactMarkdown>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {exercises.map((exercise) => (
            <div
              key={exercise._id}
              className="bg-gray-800 bg-opacity-60 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
            >
              <Link to={`/exercises/${exercise._id}`}>
                <div className="text-center bg-gray-900 bg-opacity-60 py-3 rounded-xl justify-center mb-4 mx-auto">
                  <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 text-2xl font-extrabold font-title tracking-wide">
                    {exercise.name}
                  </h1>
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <p className="text-xs border-teal-300 text-teal-300 px-2 py-0.5 rounded-full border capitalize">
                    {exercise.category}
                  </p>

                  <p
                    className={`text-xs px-2 py-0.5 rounded-full border capitalize ${
                      exercise.difficulty === "low"
                        ? "border-green-400 text-green-600"
                        : exercise.difficulty === "medium"
                        ? "border-yellow-300 text-yellow-300"
                        : "border-red-400 text-red-600"
                    }`}
                  >
                    {exercise.difficulty}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Link
          to={`/${user._id}/routines`}
          className="text-center w-40 bg-gradient-to-r from-indigo-800 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-xl mt-8"
        >
          My Routines
        </Link>
      </div>
    </div>
  );
}

export default RoutineDetailsPage;
