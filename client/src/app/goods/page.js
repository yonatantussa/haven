'use client';

import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function Goods() {
  const router = useRouter();

  const handleRequestGoods = () => {
    router.push('/goods/request');
  };

  const handleDonateGoods = () => {
    router.push('/goods/donate');
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Large card at the top */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Donate and Request Goods</h1>
          <p className="text-xl">Essential Supplies for Those in Need</p>
        </div>

        {/* Two cards below */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Request Goods Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Request Goods</h2>
            <p className="mb-4">Are you an organization or individual in need of essential supplies? Submit a request for goods here.</p>
            <button
              onClick={handleRequestGoods}
              className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Request Goods
            </button>
          </div>

          {/* Donate Goods Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Donate Goods</h2>
            <p className="mb-4">Help those in need by donating essential supplies. View current requests and contribute here.</p>
            <button
              onClick={handleDonateGoods}
              className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Donate Goods
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
