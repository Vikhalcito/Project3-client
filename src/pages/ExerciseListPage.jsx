import { useEffect, useState } from 'react';
import axios from 'axios';
import imgBg from "../assets/Fondo-Exercises.png"

const API_URL = "http://localhost:5005";

const ExerciseListPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const getYoutubeThumbnail = (url) => {
  const match = url?.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
};

const videoUrl = "https://www.youtube.com/watch?v=Pw8PYdZUlnI"

const thumbnail = getYoutubeThumbnail("https://www.youtube.com/watch?v=Pw8PYdZUlnI");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/exercises`);
        setExercises(res.data)
        console.log(res.data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgBg})` }} // cambia a tu imagen real
    >
      {/* Título principal */}
      <h1
        className="absolute top-24 left-1/2 -translate-x-1/2 
          text-transparent bg-clip-text bg-gradient-to-r from-teal-950 via-teal-600 to-teal-950 
          text-6xl sm:text-5xl font-extrabold font-title tracking-wide"
      >
        Exercises
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="w-full max-w-6xl mt-20 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">
        {loading ? (
          <div className="text-center text-white">Loading exercises...</div>
        ) : exercises.length === 0 ? (
          <div className="text-center text-white">No exercises found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <div
                key={exercise._id}
                className="bg-gray-800 bg-opacity-70 rounded-xl p-4 shadow-md text-white hover:shadow-xl transition"
              >

                {thumbnail && (
        <img
          src={thumbnail}
          alt={`Thumbnail for ${exercise.name}`}
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}

                <h2 className="text-xl font-semibold mb-1">{exercise.name}</h2>
                <p className="text-sm text-teal-300">{exercise.category}</p>
                <p className="mt-2 text-sm text-gray-200">{exercise.description}</p>
                <p className="mt-2 text-sm text-blue-400 capitalize">
                  Difficulty: {exercise.difficulty}
                </p>

                {videoUrl && (
                  <a
                    href="https://www.youtube.com/watch?v=Pw8PYdZUlnI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 text-sm mt-2 inline-block underline"
                  >
                    Watch Video
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseListPage;