import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed parsing user from localStorage', e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pb_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('pb_user');
    }
  }, [currentUser]);

  const login = async (identifier, password, rememberThaliPreference) => {
    const res = await authService.login(identifier, password, rememberThaliPreference);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsAuthModalOpen(false);
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (name, phone, email, password, rememberThaliPreference) => {
    const res = await authService.register(name, phone, email, password, rememberThaliPreference);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsAuthModalOpen(false);
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const otpLogin = async (phone) => {
    const res = await authService.otpLogin(phone);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setIsAuthModalOpen(false);
      return res.user;
    }
    throw new Error(res.message || 'OTP verification failed');
  };

  const socialLogin = (provider) => {
    const mockUser = {
      name: provider === 'Google' ? 'Anand Joshi (Google)' : 'Anand Joshi (WhatsApp)',
      phone: '+91 98220 54128',
      rememberThaliPreference: true
    };
    setCurrentUser(mockUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      otpLogin,
      socialLogin,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
