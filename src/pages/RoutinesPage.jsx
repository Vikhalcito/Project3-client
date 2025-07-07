import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link, useNavigate } from "react-router-dom";

import { Trash2, Loader2, SquarePen } from "lucide-react";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null); //Borrar rutina, state para el id

  const navigate = useNavigate();

  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
  if (!isLoggedIn) {
    navigate("/");          // o a /login
  }
}, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchExercises = () => {
     
      const storedToken = localStorage.getItem("authToken");
      
      axios
        .get(`${API_URL}/api/routines`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
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

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta rutina definitivamente?")) return;

    const storedToken = localStorage.getItem("authToken");
    setDeletingId(id);
    setRoutines((prev) => prev.filter((r) => r._id !== id));

    try {
      await axios.delete(`${API_URL}/api/routines/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
    } catch (err) {
      console.error("Delete failed", err);
      alert("No se pudo borrar. Intenta de nuevo.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!user) {
    return <div className="pt-32 text-black">Cargando…</div>;
  }

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <h1 className="text-center text-white bg-gray-950 bg-opacity-50 p-3 rounded-xl text-4xl sm:text-2xl font-title tracking-wide">
        Your Routines
      </h1>
      <div className="w-full max-w-6xl mt-5 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {routines.map((routine) => (
            <div
              key={routine._id}
              className="relative bg-gray-800 bg-opacity-70 rounded-xl p-3 shadow-md text-white hover:shadow-xl transition"
            >
              
              <Link to={`/routines/${routine._id}`}>
                <h2 className="text-2xl text-center font-bold m-2">
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
              
               <div className="my-3 p-1 border-t border-gray-400" /> 

              <button
                onClick={(e) => {
                  e.stopPropagation(); // evita abrir el <Link>
                  handleDelete(routine._id);
                }}
                disabled={deletingId === routine._id}
                className="absolute bottom-2 right-2 rounded-full
               text-white hover:bg-red-900/20 
               focus:outline-none focus:ring-2 
               z-10"
              >
                {deletingId === routine._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>

              <Link
                className="absolute bottom-2 left-2 rounded-full
               text-white hover:bg-red-900/20 
               focus:outline-none focus:ring-2 
               z-10"
                to={`/routines/${routine._id}/update`}
              >
                {" "}
                <SquarePen className="w-5 h-5" />{" "}
              </Link>
            </div>
          ))}
        </div>
        <Link
          to={`/${user._id}/routines/create`}
          className="inline-block w-auto m-2 px-5 bg-gradient-to-r from-indigo-800 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-xl mt-2"
        >
          New Routine
        </Link>
      </div>
    </div>
  );
}

export default RoutinesPage;
