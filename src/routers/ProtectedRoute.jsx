import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  let { currentUser } = useContext(AuthContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(currentUser == null);
    setIsLoggedIn(currentUser != null);
  }, [currentUser]);

  return isLoggedIn ? children : <Navigate to={"/"} />;
};

export default ProtectedRoute;
