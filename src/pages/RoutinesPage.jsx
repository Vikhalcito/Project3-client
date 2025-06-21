import { useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function RoutinesPage() {

    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  const fetchExercises = () => {
    axios
      .get(`${API_URL}/api/routines`)
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
                className="bg-gray-900 bg-opacity-80 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
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
    </div>
    </div>
)

}

export default RoutinesPage;