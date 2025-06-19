import { useState } from 'react';
import axios from 'axios';

const AddExercise = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: 'medium',
    videoUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await axios.post('http://localhost:3000/api/exercises', form); // tu ruta backend
      setSuccess(true);
      setForm({
        name: '',
        description: '',
        category: '',
        difficulty: 'medium',
        videoUrl: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error adding exercise');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Exercise name"
          required
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Chest, Legs)"
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="videoUrl"
          value={form.videoUrl}
          onChange={handleChange}
          placeholder="Video URL (optional)"
          className="w-full border border-gray-300 rounded-lg p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Submitting...' : 'Add Exercise'}
        </button>

        {success && <p className="text-green-600">Exercise added successfully!</p>}
      </form>
    </div>
  );
};

export default AddExercise;