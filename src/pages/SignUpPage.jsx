import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import imgHome from "../assets/Fondo-CaliZenics.png"

const API_URL = "http://localhost:5005";

function SignUpPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const navigate = useNavigate();  
  const handleSignupSubmit = (e) =>{
    e.preventDefault();
    
    const requestBody = { email, password, name };
 
    
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  }  
  return (
    <div
          className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${imgHome})` }}
        >
          {/* Título principal */}
          <h1
            className="absolute top-24 left-1/2 -translate-x-1/2 
              text-transparent bg-clip-text bg-gradient-to-r from-teal-950 via-teal-600 to-teal-950 
              text-6xl sm:text-5xl font-extrabold font-title tracking-wide"
          >
            CaliZenics
          </h1>
    
          {/* Login Card - separado del h1 con margen superior para evitar solapamiento */}
          <div className="w-full max-w-sm mt-10 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-6">Signup</h2>
        

        {/* Formulario de Log in */}
        <form onSubmit={handleSignupSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={handleName}
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />                
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmail}
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"        
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            className="w-full bg-gray-700 bg-opacity-50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="flex items-start gap-2 text-sm text-white">
            <input type="checkbox" className="mt-1 accent-teal-600" />
            <span>You are about to change your body, your mind, your life!</span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
            SIGN UP
          </button>
        </form>

        {/* Footer */}
       
         <div className="mt-6 text-center text-gray-200">
          Already have an account?
          <Link to= {"/login"} className="ml-2 bg-gradient-to-r from-teal-600 to-teal-300 active:brightness-150 transition duration-300 text-transparent bg-clip-text font-semibold">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUpPage