import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 const[user,setUser]=useState(null);

  const login = (userData) => {
    // Perform login logic here
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ user,isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
