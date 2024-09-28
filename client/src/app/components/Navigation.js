'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

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
          <span className="text-white font-bold text-xl">Haven</span>
        </Link>
        <div className="space-x-4">
          <Link href="/goods" className="text-white hover:text-blue-200">
            Goods
          </Link>
          <Link href="/shelter" className="text-white hover:text-blue-200">
            Shelter
          </Link>
          <Link href="/learn" className="text-white hover:text-blue-200">
            Learn More
          </Link>
          <Link href="/messages" className="text-white hover:text-blue-200">
            Messages
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-blue-200"
          >
          
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
