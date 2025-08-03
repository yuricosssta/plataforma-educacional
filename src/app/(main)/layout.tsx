"use client";

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Renderiza um loader ou null enquanto verifica a autenticação para evitar piscar a tela
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      {/* <Navbar />       */}
      <main className="p-8">      
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}