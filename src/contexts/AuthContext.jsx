import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutPending, setLogoutPending] = useState(false);
  const [authError, setAuthError] = useState('');
  const fetched = useRef(false);

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/auth/me');

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setAuthError('');
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
  }, []);

  const logout = async () => {
    if (logoutPending) {
      return;
    }

    setLogoutPending(true);
    setAuthError('');

    try {
      const res = await api.post('/api/auth/logout', {});

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Logout failed');
      }

      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      setAuthError(error.message || 'Unable to log out right now.');
    } finally {
      setLogoutPending(false);
    }
  };

  const refetchUser = () => {
    fetched.current = false;
    fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refetchUser, logoutPending, authError, setAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
