import React, { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react'
import axios from 'axios';

import imgHome from "../assets/Fondo-CaliZenics.png"
import { Link } from 'react-router-dom';
const API_URL = "http://localhost:5005";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/profile`) // 🔗 Ajusta la URL real
      .then((res) => setUser(res.data))
      .then((res)=> console.log(res.data))
      .catch((err) => {
        console.error(err);
        setError('No se pudo obtener la información del usuario.');
      })
      .finally(() => setLoading(false));
  }, []);

  /* ---------------- Renderizado condicional ----------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <span className="animate-pulse">Cargando…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  /* ---------------- Datos listos ----------------- */
  const {
    email = '—',
    username,
    name,
    photoURL,
    age = '—',
    weight, // nombre correcto
    weitgh, // typo común
    height = '—',
    description,
    routines = [],
    routinesCount,
    
  } = user || {};

  console.log(user.id)

  const displayName = (username || name || email?.split?.('@')[0] || 'USERNAME').toUpperCase();
  const weightValue = weight ?? weitgh ?? '—';
  const routinesQty = typeof routinesCount === 'number' ? routinesCount : routines.length;

  return (
    <div className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imgHome})` }}>
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
            <CircleUserRound className="w-40 h-40 text-white" strokeWidth={1}/>
          )}
        </div>

        {/* USERNAME */}
        <p className="text-sm font-semibold text-gray-100 text-center">USERNAME {displayName}</p>

        {/* Email en itálica */}
        <p className="text-xs italic text-gray-400 text-center">
          
          email-address: {email}
        </p>
        {/* Age | Weight | Height */}
        <div className="mt-6 grid grid-cols-3 gap-x-4 text-xs font-medium w-full text-center text-white">
          
            <span>🎂 Age: {age}</span>
          
          
            <span>⚖️ Weight: {weightValue} kg </span> 
          
          
            <span>📏 Height: {height} cm</span> 
          
        </div>
</div>
        
        

        {/* Descripción */}
        
          <div className="mt-6 w-full bg-gray-900 bg-opacity-40 rounded-xl text-center text-xs leading-relaxed">
            <p className="mt-2 text-sm text-gray-200">
                  {description}adsdasdasdads dada   dasdasdasdasd  d asdasdasdasd a adasssd 
                </p>
          </div>
        

        {/* Fila final: Botón + contador */}
        <div className="mt-8 w-full flex items-center justify-between">
          <Link
            to={`/user-${user.id}/routines`}
            className="w-full text-center p-6 bg-gradient-to-r from-indigo-900 to-indigo-400 active:brightness-125 transition duration-300 font-bold rounded-full py-2 text-white">
           🏋️Routines
          </Link>

          
        </div>
      </div>
    </div>
  );
}