import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (isAuthenticated && userEmail && userName) {
      setUser({
        name: userName,
        email: userEmail
      });
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    setUser({ name, email });
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setUser(null);
    navigate('/');
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  };
};