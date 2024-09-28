'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthenticatedLayout from '../../../components/AuthenticatedLayout';

export default function DonateSingleItem({ params }) {
  const [request, setRequest] = useState(null);
  const [donationAmount, setDonationAmount] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentRequests = JSON.parse(searchParams.get('currentRequests') || '[]');
    const currentRequest = currentRequests.find(r => r.id.toString() === params.id);
    if (currentRequest) {
      setRequest(currentRequest);
    } else {
      // Fallback to dummy data if not found
      setRequest({
        id: params.id,
        organization: 'Unknown',
        item: 'Unknown',
        requested: 1000,
        received: 0,
        description: 'No description available.'
      });
    }
  }, [params.id, searchParams]);

  const handleDonate = async (e) => {
    e.preventDefault();
    console.log('Donating:', { requestId: params.id, amount: donationAmount });
    
    // Updates the received amount
    const updatedRequest = {
      ...request,
      received: request.received + donationAmount
    };
    
    setRequest(updatedRequest);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // After successful donation, redirect to the donate page
    router.push('/goods/donate');
  };

  if (!request) return <div>Loading...</div>;

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Donate to {request.organization}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold mb-4">{request.item}</h2>
          <p className="mb-4">{request.description}</p>
          <p className="mb-2">Requested: {request.requested}</p>
          <p className="mb-4">Received: {request.received}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(request.received / request.requested) * 100}%` }}
            ></div>
          </div>
          <form onSubmit={handleDonate}>
            <div className="mb-4">
              <label htmlFor="amount" className="block mb-2">Amount to Donate</label>
              <input
                type="number"
                id="amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseInt(e.target.value))}
                min="1"
                max={request.requested - request.received}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirm Donation
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
