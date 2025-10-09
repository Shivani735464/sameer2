import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
  // Load user + token from localStorage on init
  const saved = localStorage.getItem("labourUser");
  return saved ? JSON.parse(saved) : null;
});

  useEffect(() => {
    const storedUser = localStorage.getItem("labourUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("labourUser", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("labourUser");
    setUser(null);
  };

  
  return (
   <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);