import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Home, LogIn, UserPlus, User, LogOut } from "lucide-react";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav
      className="fixed top-0 w-full z-50
                    bg-gradient-to-r from-indigo-800 via-teal-500 to-teal-800
                    py-2"
    >
      <div className="px-4 flex items-center justify-between flex-1">
        <h1 className="text-white font-title text-xl">CaliZenics</h1>

        <Link
          to="/"
          aria-label="Home"
          className="text-gray-200 hover:text-yellow-300 transition"
        >
          <Home className="w-6 h-6" />
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              aria-label="Login"
              className="text-gray-200 hover:text-yellow-300 transition"
            >
              <LogIn className="w-6 h-6" />
            </Link>

            <Link
              to="/signup"
              aria-label="Sign Up"
              className="text-gray-200 hover:text-yellow-300 transition"
            >
              <UserPlus className="w-6 h-6" />
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link
              to="/user"
              aria-label="Profile"
              className="text-gray-200 hover:text-yellow-300 transition"
            >
              <User className="w-6 h-6" />
            </Link>

            <button
              onClick={logOutUser}
              aria-label="Logout"
              className="text-gray-200 hover:text-yellow-300 transition"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
