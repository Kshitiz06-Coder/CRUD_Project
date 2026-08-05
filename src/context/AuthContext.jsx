import { useState, useEffect } from 'react';
import { AuthContext } from './auth';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

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
        } catch (err) {
          if (isMounted) {
            console.log('Session check failed:', err.message);
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
          }
        }
      }
      if (isMounted) setLoading(false);
    };

    initAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    const accessToken = data.accessToken;
    setToken(accessToken);
    setUser(data);
    localStorage.setItem('token', accessToken);
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