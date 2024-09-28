'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';

// Dummy data for goods requests (will replace with API call)
let dummyRequests = [
  { id: 1, organization: 'Red Cross', item: 'Blankets', requested: 1000, received: 750 },
  { id: 2, organization: 'Local Food Bank', item: 'Canned Goods', requested: 5000, received: 3200 },
  { id: 3, organization: 'Animal Shelter', item: 'Pet Food', requested: 2000, received: 1500 },
];

export default function DonateGoods() {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setRequests(dummyRequests);
  }, []);

  const handleDonate = (requestId) => {
    // Pass the current requests state to the donation page
    router.push(`/goods/donate/${requestId}?currentRequests=${JSON.stringify(requests)}`);
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Donate Goods</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{request.organization}</h2>
              <p className="mb-2">Item: {request.item}</p>
              <p className="mb-2">Requested: {request.requested}</p>
              <p className="mb-4">Received: {request.received}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(request.received / request.requested) * 100}%` }}
                ></div>
              </div>
              <button
                onClick={() => handleDonate(request.id)}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Donate
              </button>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
