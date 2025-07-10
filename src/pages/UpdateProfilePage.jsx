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
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

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
      <h1 className="text-3xl font-bold text-white bg-gray-900 bg-opacity-60 rounded-xl shadow-2xl p-2 text-center mb-6">
        Editar perfil
      </h1>
      <div className="w-full max-w-sm bg-gray-900 bg-opacity-60 rounded-3xl shadow-2xl p-8">
        <form
          onSubmit={handleSave} // Usamos onSubmit para manejar el envío del formulario
          className="space-y-4"
        >
          {/* Componente de subida de foto */}
          <ProfilePhotoUploader onPhotoUpload={handlePhotoUpload} />

          {/* Campos del formulario */}
          <div className="space-y-6 w-full">
  {/* Name */}
  <div className="flex flex-col">
    <label className="text-white text-center font-semibold mb-1">Name</label>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      placeholder="Nombre"
      className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
    />
  </div>

  {/* Age, Weight, Height in horizontal row */}
  <div className="flex flex-row space-x-4">
    {/* Age */}
    <div className="w-1/3 flex flex-col">
      <label className="text-white text-center font-semibold mb-1">Age</label>
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="Edad"
        className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      />
    </div>

    {/* Weight */}
    <div className="w-1/3 flex flex-col">
      <label className="text-center text-white font-semibold mb-1">Weight</label>
      <input
        type="number"
        name="weight"
        value={form.weight}
        onChange={handleChange}
        placeholder="Peso (kg)"
        min={0}
        max={120}
        step={1}
        className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      />
    </div>

    {/* Height */}
    <div className="w-1/3 flex flex-col">
      <label className="text-white text-center font-semibold mb-1">Height</label>
      <input
        type="number"
        name="height"
        value={form.height}
        onChange={handleChange}
        placeholder="Altura (cm)"
        className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      />
    </div>
  </div>

  {/* About me */}
  <div className="flex flex-col">
    <label className="text-white text-center font-semibold mb-1">About me</label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      placeholder="Descripción"
      rows={3}
      className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 resize-none"
    />
  </div>
</div>


          <button
            type="submit" // Asegúrate de que el botón sea de tipo submit
            disabled={loading}
            className="w-full text-center p-6 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 font-bold rounded-xl py-2 text-white"
          >
            {loading ? "Guardando…" : "Guardar cambios"}
          </button>
        </form>
      </div>
    </div>
  );
}
