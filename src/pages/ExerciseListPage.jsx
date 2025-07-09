import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

// ────────────────────────────
// Helpers reutilizables
const getYoutubeId = (url = "") =>
  url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/)?.[1] ?? null;

const getYoutubeThumbnail = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

const makeEmbedUrl = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
};
// ────────────────────────────

function ExerciseListPage() {
  // Datos del contexto de autenticación
  const { user, isLoading: authLoading } = useContext(AuthContext);

  // Estado propio del componente
  const [exercises, setExercises] = useState([]);
  const [exercisesLoading, setExercisesLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // Log del rol solo cuando ya existe user
  useEffect(() => {
    if (user) console.log("aqui el usuario", user.role);
  }, [user]);

  // Carga de ejercicios
  useEffect(() => {
    axios
      .get(`${API_URL}/api/exercises`)
      .then((res) => {
        const data = res.data.map((ex) => {
          const videoUrl =
            ex.videoUrl?.trim() || "https://www.youtube.com/watch?v=Pw8PYdZUlnI";
          return {
            ...ex,
            videoUrl,
            thumbnail: getYoutubeThumbnail(videoUrl),
          };
        });

        setExercises(data);
      })
      .catch((error) => {
        console.error("Failed to fetch exercises:", error);
      })
      .finally(() => setExercisesLoading(false));
  }, []);

  // Mientras se comprueban auth **o** ejercicios, mostramos loader global
  if (authLoading || exercisesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white text-lg">Cargando…</p>
      </div>
    );
  }

  return (
    <div
      className="pt-24 pb-8 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      {/* Título principal */}
      <h1 className="absolute top-24 left-1/2 -translate-x-1/2 text-transparent bg-clip-text bg-gradient-to-r from-teal-950 via-teal-300 to-teal-950 text-6xl sm:text-5xl font-extrabold font-title tracking-wide">
        Exercises
      </h1>

      <div className="w-full max-w-6xl mt-20 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">
        {exercises.length === 0 ? (
          <div className="text-center text-white">No exercises found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="bg-gray-800 bg-opacity-70 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >
                <Link to={`/exercises/${exercise._id}`}>
                  {exercise.thumbnail && (
                    <img
                      src={exercise.thumbnail}
                      alt={`Thumbnail for ${exercise.name}`}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}

                  <h2 className="text-xl font-semibold mb-1">
                    {exercise.name}
                  </h2>
                  <p className="text-sm text-teal-300">{exercise.category}</p>
                  <p className="mt-2 text-sm text-gray-200">
                    {exercise.description}
                  </p>
                  <p className="mt-2 text-sm text-blue-400 capitalize">
                    Difficulty: {exercise.difficulty}
                  </p>
                </Link>

                {/* Botón que abre el modal */}
                <button
                  onClick={() => {
                    setActiveVideo(exercise.videoUrl);
                    setIsModalOpen(true);
                  }}
                  className="text-teal-400 text-sm mt-2 inline-block underline hover:text-teal-300 transition"
                >
                  Watch Video
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botón para admins */}
        {user?.role === "admin" && (
          <Link
            to="/exercises/addExercise"
            className="inline-block w-auto m-2 px-5 bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Add Exercise
          </Link>
        )}
      </div>

      {/* ────────── Modal ────────── */}
      {isModalOpen && activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
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
    </div>
  );
}

export default ExerciseListPage;