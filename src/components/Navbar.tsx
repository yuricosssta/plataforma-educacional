"use client";

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/posts" className="font-bold text-xl">
        Admin Painel
      </Link>
      <div>
        <Link href="/posts/new" className="mr-4 hover:text-gray-300">
          Novo Post
        </Link>
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          Sair
        </button>
      </div>
    </nav>
  );
}