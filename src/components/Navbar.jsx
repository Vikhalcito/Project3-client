import { Link } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

 return (
     <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-950 via-teal-600 to-teal-950 bg-opacity-50  flex justify-between items-center px-4 py-3">
      {/* Botón LOG IN */}

      {isLoggedIn && (

        <>
          <Link to="/user">
            <button>Profile</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
           <button className="border border-white p-2 rounded-lg flex flex-col justify-center items-center space-y-1">
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
          <Link to ={"/"} className="text-gray-200 border border-gray-200 px-4 py-2 rounded-lg font-semibold">
        HOME
      </Link>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
          <Link to ="/" className="text-gray-200 border border-gray-200 px-4 py-2 rounded-lg font-semibold">
        HOME
      </Link>
          <button className="border border-white p-2 rounded-lg flex flex-col justify-center items-center space-y-1">
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </button>
        </>
      )}


    </nav>
  );

}

export default Navbar