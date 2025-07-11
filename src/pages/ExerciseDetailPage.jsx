import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Play } from "lucide-react";

import imgBg from "../assets/Fondo-Exercises.png";

//const API_URL = "http://localhost:5005";
const API_URL = "https://calizenics-server.onrender.com";

function ExerciseDetailsPage() {
  const { exerciseId } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isLoggedIn } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchExercises = async () => {
      if (!isLoggedIn) {
        navigate("/exercises");
      }
      try {
        const res = await axios.get(`${API_URL}/api/exercises/${exerciseId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setExercise(res.data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const deleteExercise = () => {
    axios
      .delete(`${API_URL}/api/exercises/${exerciseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/exercises");
      });
  };

  const getYoutubeThumbnail = (url) => {
    const match = url?.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`
      : null;
  };

  const defaultVideoUrl = "https://www.youtube.com/watch?v=Pw8PYdZUlnI";
  const thumbnail =
    getYoutubeThumbnail(exercise.videoUrl) ||
    getYoutubeThumbnail(defaultVideoUrl);

  const makeEmbedUrl = (url) => {
    const id = url.match(
      /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/
    )?.[1];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
  };

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="w-full max-w-6xl mt-20 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">
        {loading ? (
          <div className="text-center text-white">Loading exercises...</div>
        ) : exercise.length === 0 ? (
          <div className="text-center text-white">No exercises found.</div>
        ) : (
          <div className="max-w-md w-full mx-auto bg-gray-800 bg-opacity-70 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition">
            <h2 className="text-xl text-center font-semibold mb-2 py-1 px-2">
              {exercise.name}
            </h2>

            {thumbnail && (
              <img
                src={thumbnail}
                alt={`Thumbnail for ${exercise.name}`}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
            )}
            <div className="grid grid-cols-2 items-center gap-2 mt-2">
              <label className="text-sm font-medium">Category:</label>
              <p className="text-xs text-teal-300 border border-teal-300 px-2 py-0.5 mx-auto my-1 rounded-full text-center">
                {exercise.category}
              </p>
            </div>

            
            <div className="grid grid-cols-2 items-center gap-2 mt-2">
              <label className="text-sm font-medium">Difficulty:</label>
              <p
                className={`text-xs px-2 py-0.5 rounded-full border mx-auto my-1 capitalize text-center ${
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

            <div className="grid grid-cols-2 items-center gap-2 mt-2">
              <label className="text-sm font-medium">Video:</label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveVideo(exercise.videoUrl);
                  setIsModalOpen(true);
                }}
                className="w-auto mx-auto p-2 my-1 h-8 flex items-center justify-center text-indigo-300 hover:text-teal-300 rounded-full border border-indigo-400 gap-1"
              >
                <Play className="w-4 h-4 text-current" />
                <span className="text-sm">Play</span>
              </button>
            </div>

            <div className="my-1">
              <label className="text-md font-medium">Description:</label>
              <p className="bg-gray-900 bg-opacity-40 rounded-xl p-2 mt-1 text-sm text-white border border-gray-700">
                {exercise.description}
              </p>
            </div>

            {user && user.role === "admin" ? (
              <>
                <Link
                  to={`/exercises/update/${exerciseId}`}
                  className="inline-block text-center w-full bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-xl mt-2"
                >
                  Update
                </Link>
                <button
                  onClick={deleteExercise}
                  className="w-full bg-gradient-to-r from-red-950 to-red-300 active:brightness-125 transition duration-300 text-white  font-bold py-2 rounded-xl mt-2"
                >
                  Delete
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>

      {isModalOpen && activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // cerrar al hacer clic fuera
        >
          <div
            className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()} // evitar que el click interno cierre el modal
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700 text-lg"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={makeEmbedUrl(activeVideo)}
                title="YouTube video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-center w-auto bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold px-4 py-2 rounded-xl mt-2"
      >
        Go Back
      </button>
    </div>
  );
}

export default ExerciseDetailsPage;
