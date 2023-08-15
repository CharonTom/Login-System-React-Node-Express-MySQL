import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthcontextProvider = ({ children }) => {
  const [formError, setFormError] = useState("");
  const [successfullyLogin, setSuccessfullyLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (formValues) => {
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        setCurrentUser(res.data);
        setSuccessfullyLogin(true);
      })
      .catch((error) => {
        if (error.response?.status === 429) {
          if (
            error.response?.data ===
            "Too many requests, please try again later."
          ) {
            setFormError("Too many requests, please try again later.");
          }
        } else if (error.response?.status === 401) {
          setFormError("Incorrect username or password");
        }
      });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        successfullyLogin,
        currentUser,
        login,
        formError,
        setFormError,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
