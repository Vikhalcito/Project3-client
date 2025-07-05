import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ExerciseForm from "../components/ExerciseForm";
const API_URL = "http://localhost:5005";

export default function UpdateExercisePage() {
  const { exerciseId } = useParams();
  console.log(exerciseId)
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
//const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Traer datos existentes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/exercises/${exerciseId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((res) => {
        const data = res.data;
        setInitialValues(data)
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      });
  }, [exerciseId]);

  const handleUpdate = (form)=> {

    const storedToken = localStorage.getItem("authToken");
    const requestBody = form
    axios
    .put(`${API_URL}/api/exercises/${exerciseId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } }) 
    .then(() => {
        setSuccess(true)
        navigate(`/exercises/${exerciseId}`)
    })
     
    .catch ((err) => {
      setError(err.message);
  });
   }

  // Esperar a tener los datos antes de renderizar
  if (!initialValues && !error) return null;

  return (
    <ExerciseForm
      title="Update Exercise"
      initialValues={initialValues}
      onSubmit={handleUpdate}
      //loading={loading}
      successMsg={success && "Exercise updated successfully!"}
      errorMsg={error}
    />
  );
}