import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ExerciseForm from "../components/ExerciseForm";
//const API_URL = "http://localhost:5005";
const API_URL = "https://calizenics-server.onrender.com";
export default function UpdateExercisePage() {
  const { exerciseId } = useParams();
  console.log(exerciseId)
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

 
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

  
  if (!initialValues && !error) return null;

  return (
    <ExerciseForm
      title="Update Exercise"
      initialValues={initialValues}
      onSubmit={handleUpdate}
      
      successMsg={success && "Exercise updated successfully!"}
      errorMsg={error}
    />
  );
}