import { Link } from "react-router-dom";
import imgHome from "../assets/Fondo-CaliZenics.png"

function HomePage() {
    return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
      {/* Título centrado arriba */}
      <h1 className="absolute top-24 left-1/2 -translate-x-1/2 
  text-transparent bg-clip-text bg-gradient-to-r from-black via-amber-600 to-black 
  text-6xl sm:text-5xl font-extrabold font-title tracking-wide 
  shadow-[0_2px_20px_rgba(0,0,0,0.6)] p-1 rounded">
        CaliZenics
      </h1>

      {/* Más contenido debajo para probar el scroll */}
      <div className="pt-60 px-4 text-black text-lg">
        <p>Contenido de prueba para scroll...</p>
        <p>Más secciones aquí</p>
      </div>

      <Link to={"/exercises"}
            type="submit"
            className="inline-block w-auto m-2 px-5 bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
            Our Exercises
          </Link>
    
  
    </div>
  );
}

export default HomePage;