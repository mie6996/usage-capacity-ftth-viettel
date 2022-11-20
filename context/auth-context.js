import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState({
    token: "",
  });

  const setUserAuthInfo = (token) => {
    localStorage.setItem("token", token);

    setAuthContext({
      ...authContext,
      token,
    });
  };

  const isAuthenticated = () => {
    return !!authContext.token;
  };

  const authContextData = {
    isAuthenticated,
    setUserAuthInfo,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
