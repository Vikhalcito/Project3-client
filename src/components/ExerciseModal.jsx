export default function ExerciseModal({ exercise, onClose }) {
  if (!exercise) return null;

  const getYoutubeEmbed = (url) => {
    const match = url?.match(/(?:v=|\.be\/)([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoUrl =
    exercise.videoUrl || "https://www.youtube.com/watch?v=IODxDxX7oi4";
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white  max-w-lg w-full p-6 rounded-xl relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-1">{exercise.name}</h3>
        <p className="text-sm text-gray-500 mb-2 capitalize">
          Type: {exercise.type} • Difficulty:{" "}
          <span className="font-medium">{exercise.difficulty}</span>
        </p>
        <p className="mb-3 text-gray-700">{exercise.description}</p>

        <div className="aspect-video">
          <iframe
            src={getYoutubeEmbed(videoUrl)}
            className="w-full h-full rounded"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
