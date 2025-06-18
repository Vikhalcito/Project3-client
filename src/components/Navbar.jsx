import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  

 return (
     <nav className="w-full bg-gradient-to-r from-teal-950 via-teal-400 to-teal-950 flex justify-between items-center px-4 py-3">
      {/* Botón LOG IN */}
      <button className="text-white border border-white px-4 py-2 rounded-lg font-semibold">
        LOG IN
      </button>

      {/* Icono menú hamburguesa */}
      <button className="border border-white p-2 rounded-lg flex flex-col justify-center items-center space-y-1">
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
    </nav>
  );

}