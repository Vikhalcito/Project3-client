import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CircleUserRound, Cake, Weight, Ruler  } from "lucide-react";
import { AuthContext } from "../context/auth.context";
import imgHome from "../assets/Fondo-CaliZenics.png";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="pt-32 text-white">Cargando…</div>;
  }

  // Si no hay usuario, redirige inmediatamente
  if (!user) {
    
    return <Navigate to="/login" replace />;
  }

   const userPath = `/${user._id}/routines`;

  const {
    email = "—",
    username,
    name,
    photoURL,
    age = "—",
    weight,
    height = "—",
    description,
    
    _id,
  } = user;

  const displayName = (
    username ||
    name ||
    email?.split?.("@")[0] ||
    "USERNAME"
  ).toUpperCase();
  const weightValue = weight ?? "—";
  

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      {/* Tarjeta principal */}
      <div className="w-80 bg-[#2a2f38]/50 rounded-2xl shadow-xl flex flex-col items-center p-6 text-gray-700">
        {/* Contenedor foto de perfil, nombre, email */}
        <div className="w-full mx-auto flex flex-col items-center bg-gray-800 bg-opacity-50 rounded-xl p-4 shadow-md text-white ">
          {/* Avatar */}
          <div className="w-40 h-40 rounded-full  flex items-center justify-center overflow-hidden">
            {photoURL ? (
              <img
                src={photoURL}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <CircleUserRound
                className="w-40 h-40 text-white"
                strokeWidth={1}
              />
            )}
          </div>

          {/* USERNAME */}
          <p className="text-sm font-semibold text-gray-100 text-center">
            {displayName}
          </p>

          {/* Email en itálica */}
          <p className="text-xs italic text-gray-400 text-center">
            {email}
          </p>
          {/* Age | Weight | Height */}
          <div className="mt-6 grid grid-cols-3 gap-x-4 text-xs font-medium w-full text-center text-white">
  <span className="flex flex-col items-center">
    <Cake className="w-4 h-4 mb-1" />
    Age: 31{age}
  </span>

  <span className="flex flex-col items-center">
    <Weight className="w-4 h-4 mb-1" />
    Weight: 78 {weightValue} kg
  </span>

  <span className="flex flex-col items-center">
    <Ruler className="w-4 h-4 mb-1" />
    Height: {height} cm
  </span>
</div>
        </div>

        {/* Descripción */}

        <div className="mt-6 w-full bg-gray-900 bg-opacity-40 rounded-xl text-center text-xs leading-relaxed">
          <p className="mt-2 text-sm text-gray-200">
            {description}"About me..."
          </p>
        </div>

        {/* Fila final: Botón + contador */}
        <div className="mt-8 w-full flex items-center justify-between">
          <Link
            to={userPath}
            className="w-full text-center p-6 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-125 transition duration-300 font-bold rounded-xl py-2 text-white"
          >
            🏋️Routines
          </Link>
        </div>
      </div>
    </div>
  );
}
