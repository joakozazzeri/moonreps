import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const username = localStorage.getItem('adminUser');

      if (!token || !username) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Verificar el token con el servidor
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setUser({ username, token });
      } else {
        // Token inválido, limpiar localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
    checkAuth
  };
} 