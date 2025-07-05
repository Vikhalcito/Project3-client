import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function RoutinesPage() {

    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const {user} = useContext(AuthContext);

    useEffect(() => {
  const fetchExercises = () => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/api/routines`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        setRoutines(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Routines", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  fetchExercises();
}, []);

if (!user) {
    return <div className="pt-32 text-white">Cargando…</div>;
  }

return(
    <div className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${imgBg})` }}>

         <h1 className="text-center text-white bg-gray-950 bg-opacity-50 p-3 rounded-2xl text-4xl sm:text-2xl font-title tracking-wide">
    Your Routines
  </h1>
    <div className="w-full max-w-6xl mt-5 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {routines.map((routine) => (
              
              <div
                key={routine._id}
                className="bg-gray-800 bg-opacity-70 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >
              <Link to={`/routines/${routine._id}`}>
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
                  {routine.exercises.length} Exercises
                </p>

                </Link>
              </div>
              
            ))}
          </div>
           <Link
          to={`/${user._id}/routines/create`}
          className="inline-block w-auto m-2 px-5 bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
        >
          New Routine
        </Link>
    </div>
    </div>
)

}

export default RoutinesPage;