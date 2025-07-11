import { useState, useContext } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import imgHome from "../assets/Fondo-CaliZenics.png";
//const API_URL = "http://localhost:5005";
const API_URL = "https://calizenics-server.onrender.com";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const { storeToken, authenticateUser } = useContext(AuthContext); 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(()=> {
        navigate("/user");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      className="pt-32 flex flex-col items-center justify-start px-4 min-h-screen bg-fixed bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${imgHome})` }}
    >
     
      <h1
        className="absolute top-24 left-1/2 -translate-x-1/2 
          text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-800 to-teal-400 
          text-6xl sm:text-5xl font-extrabold font-title tracking-wide"
      >
        CaliZenics
      </h1>

      <div className="w-full max-w-sm mt-20 bg-[#2a2f38] bg-opacity-50 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
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
            <span>
              You are about to change your body, your mind, your life!
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-800 to-teal-400 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-xl mt-2"
          >
            LOG IN
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
       
        <div className="mt-6 text-center text-gray-300">
          Don't have an account?
          <Link
            to={"/signup"}
            className="ml-2 bg-gradient-to-r from-indigo-900 to-teal-500 active:brightness-150 transition duration-300 text-transparent bg-clip-text font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
