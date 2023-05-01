import React, { useState, useContext, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();

  async function getUserStatus() {
    try {
      const res = await axios.get("/login/status");
      setUser(res.data.user);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  useEffect(() => {
    getUserStatus();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
