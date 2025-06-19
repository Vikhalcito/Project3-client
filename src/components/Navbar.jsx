import { Link } from "react-router-dom";

export default function Navbar() {

 return (
     <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-[rgba(4,47,46,0.9)] via-[rgba(13,148,136,0.8)] to-[rgba(4,47,46,0.9)] backdrop-blur-md shadow-md flex justify-between items-center px-4 py-3">
      {/* Botón LOG IN */}
      <Link to ={"/login"} className="text-white border border-white px-4 py-2 rounded-lg font-semibold">
        LOG IN
      </Link>

      {/* Icono menú hamburguesa */}
      <button className="border border-white p-2 rounded-lg flex flex-col justify-center items-center space-y-1">
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
    </nav>
  );

}