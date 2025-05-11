import { useState,useEffect } from "react";
import { createContext } from "react";

const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const [loggedin, setloggedin] = useState(() => {
    return localStorage.getItem("loggedin") === "true";
  });

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem("loggedin", loggedin);
  }, [loggedin]);

  const login = () => setloggedin(true);
  const logout = () => setloggedin(false);

  return (
    <Authcontext.Provider value={{ loggedin, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
