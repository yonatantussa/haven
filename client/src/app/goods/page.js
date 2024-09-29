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
          <h1 className="text-4xl font-bold mb-4">Request or Donate Goods</h1>
          <p className="text-xl">Essential Supplies for Those in Need</p>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Host Incentive Program</p>
          <p>Did you know? Google.org is offering $500 to anyone who hosts Hurricane Helene evacuees. Visit our Shelter page to learn more!</p>
        </div>
        {/* Two cards below */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Request Goods Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Request Goods</h2>
            <p className="mb-4">Are you an organization or individual in need of essential supplies? Submit a request for goods here.</p>
            <button
              onClick={handleRequestGoods}
              className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
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
