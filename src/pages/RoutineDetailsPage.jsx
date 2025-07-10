import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function RoutineDetailsPage() {

 const [routine, setRoutine] = useState([]);
const [exercises, setExercises] = useState([]);
 
  
const {user, isLoading} = useContext(AuthContext)
const { routineId } = useParams();
  

 useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/routines/${routineId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
      .then((res) => {
        const userRoutine = res.data;
        setRoutine(userRoutine);
        setExercises(userRoutine.exercises);
        console.log(userRoutine.exercises);
      })
      .catch((err) => console.error("Error al cargar ejercicios:", err));
  }, []);

  if (isLoading) {
    return <div className="pt-32 text-white">Cargando…</div>;
  }
  
  

 

 

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {exercises.map((exercise) => (
              
              <div
                key={exercise._id}
                className="bg-gray-800 bg-opacity-60 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >
              <Link to={`/exercises/${exercise._id}`}>
               
                <h2 className="text-2xl text-center font-bold mb-1">
                  {exercise.name}
                </h2>
                
                <p className="mt-2 text-sm text-gray-200">
                  {exercise.description}
                </p>
                <p className="capitalize text-teal-300">{exercise.category}</p>
                <p className="mt-2 text-sm text-blue-400 capitalize">
                  Difficulty: {exercise.difficulty}
                </p>

                </Link>

              </div>
              
              
            ))}
            
          </div>
          <Link
            to={`/${user._id}/routines`}
            className="text-center w-40 bg-gradient-to-r from-indigo-800 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-xl mt-2"
          >
            My Routines
          </Link>
          
    </div>
  );
}

export default RoutineDetailsPage;
