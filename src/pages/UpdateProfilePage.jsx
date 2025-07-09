import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import imgBg from "../assets/Fondo-Exercises.png";

import ProfilePhotoUploader from "../components/PhotoUploader"; // Componente para subir foto de perfil

const API_URL = "http://localhost:5005"; // Ajusta si tu backend usa otro puerto o dominio

export default function UpdateProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, isLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  
  const [form, setForm] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    description: "",
  });
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState(user?.userImg || "");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        description: user.description || "",
      });
    }
  }, [user]);

  if (isLoading) {
    return <div className="pt-32 text-white">Cargando…</div>;
  }
  if (!user) {
    
    return <Navigate to="/login" replace />;
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (photoURL) => {
    setUploadedPhotoURL(photoURL);
  };

  async function handleSave(e) {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario

    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      // Si no hay foto nueva, mantenemos la foto anterior
      const userImgURL = uploadedPhotoURL || user?.userImg;

      // Actualizamos el perfil con la nueva foto (si hay)
      const { data: updatedUser } = await axios.put(
        `${API_URL}/api/profile`,
        { ...form, userImg: userImgURL },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(updatedUser); // Actualizamos el usuario en el contexto
      navigate("/user"); // Redirigimos al perfil
    } catch (err) {
      // Mostramos un mensaje de error más informativo si existe la respuesta del servidor
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) return null;

  return (
    <div
      className="pt-20 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <h1 className="text-3xl font-bold text-white text-center mb-6">Editar perfil</h1>
      <div className="w-full max-w-sm bg-[#2a2f38]/50 rounded-3xl shadow-2xl p-8">
      <form
        onSubmit={handleSave}  // Usamos onSubmit para manejar el envío del formulario
        className="space-y-4"      >
        {/* Componente de subida de foto */}
        <ProfilePhotoUploader onPhotoUpload={handlePhotoUpload} />

        {/* Campos del formulario */}
        <div className="space-y-4 w-full">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
className="w-full p-2 rounded bg-gray-800 placeholder-gray-500"          />

          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Edad"
            type="number"
className="w-full p-2 rounded bg-gray-800 placeholder-gray-500"          />
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Peso (kg)"
            type="number"
className="w-full p-2 rounded bg-gray-800 placeholder-gray-500"          />
          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            placeholder="Altura (cm)"
            type="number"
className="w-full p-2 rounded bg-gray-800 placeholder-gray-500"          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            rows={3}
className="w-full p-2 rounded bg-gray-800 placeholder-gray-500"          />
        </div>

        <button
          type="submit"  // Asegúrate de que el botón sea de tipo submit
          disabled={loading}
          className="w-full bg-teal-600 py-2 rounded font-bold active:brightness-110 disabled:opacity-40"
        >
          {loading ? "Guardando…" : "Guardar cambios"}
        </button>
      </form>
      </div>
    </div>
  );
}