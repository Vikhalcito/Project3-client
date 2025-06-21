import { useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link, useParams } from "react-router-dom";
const API_URL = "http://localhost:5005";

function RoutineDetailsPage() {
  const { routineId } = useParams();

  const [routine, setRoutine] = useState([]);
  const [exercises, setExercises] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/routines/${routineId}`)
      .then((res) => {
        const userRoutine = res.data;
        setRoutine(userRoutine);
        setExercises(userRoutine.exercises);
        console.log(userRoutine.exercises);
      })
      .catch((err) => console.error("Error al cargar ejercicios:", err));
  }, []);

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {exercises.map((routine) => (
              
              <div
                key={routine._id}
                className="bg-gray-900 bg-opacity-80 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >
              <Link to={`/exercises/${routine._id}`}>
                {/* {thumbnail && (
                  <img
                    src={thumbnail}
                    alt={`Thumbnail for ${exercise.name}`}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )} */}

                <h2 className="text-2xl text-center font-bold mb-1">
                  {routine.name}
                </h2>
                
                <p className="mt-2 text-sm text-gray-200">
                  {routine.description}
                </p>
                <p className="capitalize text-teal-300">{routine.category}</p>
                <p className="mt-2 text-sm text-blue-400 capitalize">
                  Difficulty: {routine.difficulty}
                </p>

                <p className="mt-2 text-sm text-blue-400 capitalize">
                  {routine.length} Exercises
                </p>

                </Link>
              </div>
              
            ))}
          </div>
    </div>
  );
}

export default RoutineDetailsPage;
