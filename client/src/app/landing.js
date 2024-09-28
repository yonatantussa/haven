import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <header className="p-4 flex justify-end items-center relative z-10">
          <nav>
            <Link href="/login" className="mr-4 hover:underline">Login</Link>
            <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</Link>
          </nav>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10">
          <h1 className="text-6xl font-bold mb-4">Welcome to Haven</h1>
          <p className="text-xl mb-8">A platform connecting those in need with those who can help.</p>
          <Link 
            href="/signup" 
            className="bg-blue-500 text-white px-6 py-3 rounded text-xl hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            Get Started
          </Link>
        </main>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/haven-logo.png"
            alt="Haven Logo"
            width={800}
            height={800}
            className="opacity-10"
            priority
          />
        </div>
      </div>

      {/* New section with cards */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donate Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/donate.png" alt="Donate Icon" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Donate</h3>
              <p className="text-center mb-4">Support our mission with a financial contribution.</p>
              <Link href="/donate" className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Donate Now
              </Link>
            </div>

            {/* Host Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/host.png" alt="Host Icon" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Host</h3>
              <p className="text-center mb-4">Offer your space to those in need of shelter.</p>
              <Link href="/host" className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Become a Host
              </Link>
            </div>

            {/* Learn Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image src="/learn.png" alt="Learn Icon" width={64} height={64} className="mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn</h3>
              <p className="text-center mb-4">Educate yourself about the issues and how to help.</p>
              <Link href="/learn" className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="p-4 text-center">
        <p>&copy; 2024 Haven. All rights reserved.</p>
      </footer>
    </div>
  );
}
