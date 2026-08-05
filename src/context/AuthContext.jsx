import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Check stored token once on mount
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
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    
    // DummyJSON returns accessToken, not token
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