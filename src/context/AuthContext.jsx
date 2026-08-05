import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check stored token ONLY once when app first loads
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const userData = await authService.getCurrentUser();
          if (isMounted) {
            setUser(userData);
            setToken(storedToken);
          }
        } catch (error) {
          if (isMounted) {
            console.log("Token invalid or expired, clearing session");
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
          }
        }
      }
      if (isMounted) setLoading(false);
    };

    initAuth();
    return () => { isMounted = false; };
  }, []); // <-- empty: never re-runs, no HMR issues

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setToken(data.token);
    setUser(data);
    localStorage.setItem('token', data.token);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};