import React, { useEffect, useState } from "react";
// import axios from 'axios';
import AuthContext from "./AuthContext";
import axios from "../../axios/axios.js";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to check user authentication status
    const fetchUser = async () => {
      try {
        console.log("fetching user");
        const response = await axios.get("/api/auth/verify", {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          console.log("Authenticated user");
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser();
  }, [isAuthenticated]); // Empty dependency array ensures this effect runs only on mount

  const logout = async () => {
    console.log("logging out");
    const response = await axios.get("/api/auth/logout", {
      withCredentials: true,
    });
    console.log(response.data);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
