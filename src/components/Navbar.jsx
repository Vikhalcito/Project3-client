import { Link } from "react-router-dom";

function Navbar() {

 return (
     <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-950 via-teal-600 to-teal-950 bg-opacity-50  flex justify-between items-center px-4 py-3">
      {/* Botón LOG IN */}
      <Link to ={"/login"} className="text-white border border-white px-4 py-2 rounded-lg font-semibold">
        LOG IN
      </Link>

      <Link to ={"/"} className="text-gray-200 border border-gray-200 px-4 py-2 rounded-lg font-semibold">
        HOME
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

export default Navbar