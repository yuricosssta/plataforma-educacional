"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from './slices/authSlice';

export function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Este código só roda no navegador
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setAuthState({ token, isAuthenticated: true }));
    }
  }, [dispatch]);

  return null; // Este componente não renderiza nada na tela
}