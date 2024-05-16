// AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load user data from secureLocalStorage on component mount
  useEffect(() => {
    const storedUser = secureLocalStorage.getItem('user');
    const storedIsLoggedIn = secureLocalStorage.getItem('isLoggedIn');

    if (storedUser && storedIsLoggedIn) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, []);

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  const login = (userData) => {
    // Perform login logic here
    setUser(userData);
    setIsLoggedIn(true);
    // Save user data to secureLocalStorage
    secureLocalStorage.setItem('user', JSON.stringify(userData));
    secureLocalStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    // Perform logout logic here
    setUser(null);
    setIsLoggedIn(false);
    // Clear user data from secureLocalStorage
    secureLocalStorage.removeItem('user');
    secureLocalStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
