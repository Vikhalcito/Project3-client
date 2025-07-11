import { useContext, useEffect, useState } from "react";
import axios from "axios";
import imgBg from "../assets/Fondo-Exercises.png";
import { Link } from "react-router-dom";
import { Play, SlidersHorizontal, X } from "lucide-react";
import { AuthContext } from "../context/auth.context";
import ExerciseFilter from "../components/ExerciseFilter"; 

//const API_URL = "http://localhost:5005";
const API_URL = "https://calizenics-server.onrender.com";

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

function ExerciseListPage() {
  const { user, isLoading } = useContext(AuthContext);
  const [exercises, setExercises] = useState([]);
  const [exercisesLoading, setExercisesLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/exercises`)
      .then((res) => {
        const data = res.data.map((ex) => {
          const videoUrl =
            ex.videoUrl?.trim() ||
            "https://www.youtube.com/watch?v=Pw8PYdZUlnI";
          return {
            ...ex,
            videoUrl,
            thumbnail: getYoutubeThumbnail(videoUrl),
            category: ex.category?.toLowerCase() ?? "uncategorized",
            difficulty: ex.difficulty?.toLowerCase() ?? "low",
          };
        });
        setExercises(data);
      })
      .catch((error) => {
        console.error("Failed to fetch exercises:", error);
      })
      .finally(() => setExercisesLoading(false));
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    const categoryMatch = selectedCategory === "all" || ex.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "all" || ex.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

 
  const uniqueCategories = [...new Set(exercises.map((ex) => ex.category))];
  const difficultyLevels = ["low", "medium", "high"];

  if (isLoading || exercisesLoading) {
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
      <div
        className="relative z-40 inline-flex items-center bg-gray-900 bg-opacity-60 py-3 px-6 rounded-xl justify-center mb-4 mx-auto"
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 text-5xl font-extrabold font-title tracking-wide">
          Exercises
        </h1>

        <button
          onClick={() => setShowFilterModal(true)}
          className="ml-4 flex items-center text-teal-400 hover:text-indigo-400 transition"
          aria-label="Open filter modal"
        >
          <SlidersHorizontal className="w-6 h-6 mr-1" />
        </button>
      </div>

      <div
        className="w-full max-w-6xl mt-5 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8 relative transition"
      >
        {filteredExercises.length === 0 ? (
          <div className="text-center text-white">No exercises found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredExercises.map((exercise) => (
              <div
                key={exercise._id}
                className="bg-gray-800 bg-opacity-70 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >
                <Link to={`/exercises/${exercise._id}`}>
                  <h2 className="text-xl text-center font-semibold mb-2 py-1 px-2 capitalize">
                    {exercise.name}
                  </h2>

                  {exercise.thumbnail && (
                    <img
                      src={exercise.thumbnail}
                      alt={`Thumbnail for ${exercise.name}`}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  )}

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

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveVideo(exercise.videoUrl);
                        setIsModalOpen(true);
                      }}
                      className="w-7 h-5 mr-1 flex items-center justify-center text-indigo-300 hover:text-teal-300 rounded-full border border-indigo-400"
                      aria-label={`Play video for ${exercise.name}`}
                    >
                      <Play className="w-4 h-4 text-current" />
                    </button>
                  </div>

                  <p className="bg-gray-900 bg-opacity-40 rounded-xl p-2 mt-2 text-sm text-white border border-gray-700">
                    {exercise.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}

        {user?.role === "admin" && (
          <Link
            to="/exercises/addExercise"
            className="inline-block w-auto m-2 px-5 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-xl mt-4"
          >
            Add Exercise
          </Link>
        )}
      </div>

      
      {showFilterModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-20 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-70 text-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowFilterModal(false)}
              aria-label="Close filter modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Filter Exercises</h3>

            <div className="mb-4">
              <ExerciseFilter
                label="Category"
                types={uniqueCategories}
                selected={selectedCategory}
                onSelect={(val) => {
                  setSelectedCategory(val);
                  setShowFilterModal(false);
                }}
              />
            </div>

            <div>
              <ExerciseFilter
                label="Difficulty"
                types={difficultyLevels}
                selected={selectedDifficulty}
                onSelect={(val) => {
                  setSelectedDifficulty(val);
                  setShowFilterModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && activeVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700 text-lg"
              aria-label="Close video modal"
            >
              <X className="w-5 h-5" />
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
