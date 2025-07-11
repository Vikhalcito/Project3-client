import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseForm from "../components/ExerciseForm";
import axios from "axios";

const API_URL = "https://calizenics-server.onrender.com";

export default function AddExercisePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  const handleCreate = (data) => {
    setLoading(true);
    setError("");

    axios
      .post(`${API_URL}/api/exercises`, data, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        setSuccess(true);
        navigate("/exercises");
      })
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  return (
    <ExerciseForm
      title="Add Exercise"
      onSubmit={handleCreate}
      loading={loading}
      successMsg={success && "Exercise added successfully!"}
      errorMsg={error}
    />
  );
}