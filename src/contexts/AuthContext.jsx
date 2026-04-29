// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false); // prevent double fetch

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetched.current = true;
      fetchUser();
    }
  }, []); // ✅ empty array – runs only once on mount

  const logout = async () => {
    await api.post('/api/auth/logout', {});
    setUser(null);
    window.location.href = '/login';
  };

  const refetchUser = () => {
    fetched.current = false;
    fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);