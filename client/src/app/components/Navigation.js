'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-500 p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-12 h-12 -my-2">
            <Image
              src="/haven-logo-small.png"
              alt="Haven Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-white font-bold text-3xl tracking-wide haven-text">
            Haven
          </span>
        </Link>
        <div className="flex-grow flex justify-center space-x-6">
          <NavLink href="/goods" isActive={isActive('/goods')}>Goods</NavLink>
          <NavLink href="/shelter" isActive={isActive('/shelter')}>Shelter</NavLink>
          <NavLink href="/learn" isActive={isActive('/learn')}>Learn More</NavLink>
          <NavLink href="/messages" isActive={isActive('/messages')}>Messages</NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="text-white hover:text-blue-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, children, isActive }) {
  return (
    <Link 
      href={href} 
      className={`text-white hover:text-blue-200 ${
        isActive ? 'border-b-2 border-white' : ''
      }`}
    >
      {children}
    </Link>
  );
}
