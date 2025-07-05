import { Link } from "react-router-dom";
import imgHome from "../assets/Fondo-Exercises.png";
import { useState } from "react";

export default function ExerciseForm({
  title = "Add Exercise",
  initialValues = {},
  onSubmit,
  loading = false,
  successMsg,
  errorMsg,
}) 
{


  const [form, setForm] = useState({
    name: initialValues.name ?? "",
    description: initialValues.description ?? "",
    category: initialValues.category ?? "",
    difficulty: initialValues.difficulty ?? "medium",
    videoUrl: initialValues.videoUrl ?? "",
    id: initialValues.id
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      <div className="w-full max-w-sm bg-[#2a2f38]/50 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-white font-medium">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Exercise name"
            required
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
            <label className="block text-white font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
            <label className="block text-white font-medium">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Chest, Legs)"
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
            <label className="block text-white font-medium">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
            <label className="block text-white font-medium">Video URL</label>
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {errorMsg && <p className="text-red-400">{errorMsg}</p>}
            {title === "Add Exercise" ? (
            <> 
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Add Exercise
          </button>
          <Link
            to="/exercises"
            className="block text-center w-full bg-gradient-to-r from-red-950 to-red-300 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Cancel
          </Link>
          </>) :
           (<> 
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Update Exercise
          </button>
          <Link
            to={`/exercises/${initialValues._id}`}
            className="block text-center w-full bg-gradient-to-r from-red-950 to-red-300 active:brightness-125 transition duration-300 text-white font-bold py-2 rounded-full mt-2"
          >
            Cancel
          </Link>
          </>

          )}
         

          

          {successMsg && (
            <p className="text-green-600">{successMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}