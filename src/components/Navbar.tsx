"use client";

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { logout } from '@/lib/redux/slices/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  href?: string;
  onClick?: () => void;
  openInNewTab?: boolean; 
}

export const Navbar: FunctionComponent = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const menuItems: MenuItem[] = [
    { name: "Inicial", href: "/posts" },
    { name: "Criar Post", href: "/posts/new" },
    { name: "Configurações", href: "/about" },
    { name: "Sair", onClick: handleLogout },
  ];

  return (
    <nav className='container mx-auto px-5'>
      <section className="flex items-center justify-between mt-8 md:mt-16 mb-12 md:mb-16 px-4">
        <Link href="/posts">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
            Escola Desafio
          </h1>
        </Link>
        <div className="hidden md:flex items-center">

          {menuItems.map((item) => (
            <div key={item.name} className="ml-4 md:ml-8">
              {item.href ? (
                <Link
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : "_self"}
                  className={cn(
                    "hover:text-gray-900",
                    pathname === item.href && "font-semibold"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-red-600 font-semibold"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size="24" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  {menuItems.map((item) =>
                    item.href ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        target={item.openInNewTab ? "_blank" : "_self"}
                        className={cn(
                          "block py-2",
                          pathname === item.href && "font-semibold"
                        )}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        key={item.name}
                        type="button"
                        onClick={item.onClick}
                        className="block py-2 text-left w-full hover:text-red-600 font-semibold"
                      >
                        {item.name}
                      </button>
                    )
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        </section>
    </nav>
  );
};