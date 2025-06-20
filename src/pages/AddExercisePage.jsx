import { useState } from "react";
import axios from "axios";
import imgHome from "../assets/Fondo-CaliZenics.png";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005"

function AddExercisePage  () {
  
  
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    difficulty: "medium",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await axios.post(`${API_URL}/api/exercises`, form); 
      setSuccess(true);
      setForm({
        name: "",
        description: "",
        category: "",
        difficulty: "medium",
        videoUrl: "",
      });
      navigate("/exercises")
    } catch (err) {
      console.error(err);
      alert("Error adding exercise");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      {/* Login Card - separado del h1 con margen superior para evitar solapamiento */}
      <div className="w-full max-w-sm bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Add Exercise
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Exercise name"
            required
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={3}
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Chest, Legs)"
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
            {loading ? "Submitting..." : "Add"}
          </button>

          <Link
            to={"/exercises"}
            type="submit"
            className="inline-block text-center w-full bg-gradient-to-r from-red-950 to-red-300 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
           Cancel 
          </Link>

          {success && (
            <p className="text-green-600">Exercise added successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddExercisePage;
