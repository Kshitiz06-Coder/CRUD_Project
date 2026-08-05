import { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] =State(true);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Don't treat expired token as a crash — just log out silently
          if (error.response?.status === 401) {
            console.log("Token expired, clearing session");
          } else {
            console.error("Auth check failed:", error);
          }
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token, logout]);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setToken(data.token);
    setUser(data);
    localStorage.setItem('token', data.token);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};