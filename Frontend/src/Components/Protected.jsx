import { Navigate } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import Authcontext from "../Context/AuthContext";

const Protected = ({ children }) => {
  const { loggedin } = useContext(Authcontext);

  return loggedin ? children : <Navigate to="/login" replace />;
};

export default Protected;
