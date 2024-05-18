import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const userData = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    if (userData == null) return;
    setCurrentUser(userData);
  }, [userData]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
