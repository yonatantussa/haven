import Navigation from './Navigation';

export default function AuthenticatedLayout({ children }) {
  return (
    <div>
      <Navigation />
      <main className="container mx-auto mt-8">
        {children}
      </main>
    </div>
  );
}
