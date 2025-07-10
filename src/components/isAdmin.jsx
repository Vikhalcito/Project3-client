import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin( { children } ) {
  
  const { user, isLoggedIn, isLoading} = useContext(AuthContext);


  
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {

    return <Navigate to="/login" />;
  } else if(user.roleType!=="admin"){
  
    return <Navigate to="/" />;
  }else {
    return children;
  }
}

export default IsAdmin;