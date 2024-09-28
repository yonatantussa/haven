'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../../../components/AuthenticatedLayout';

export default function DonateSingleItem({ params }) {
  const [request, setRequest] = useState(null);
  const [donationAmount, setDonationAmount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // Fetching existing requests from local storage
    const existingRequests = JSON.parse(localStorage.getItem('currentRequests') || '[]');
    console.log('Existing Requests:', existingRequests); // Debugging output
    const currentRequest = existingRequests.find(r => r.id.toString() === params.id);

    // If the request is found, set it; otherwise, set dummy data
    if (currentRequest) {
      console.log('Current Request Found:', currentRequest); // Debugging output
      setRequest(currentRequest);
    } else {
      setRequest({
        id: params.id,
        organization: 'Unknown',
        item: 'Unknown',
        requested: 1000,
        received: 0,
        description: 'No description available.',
      });
    }
  }, [params.id]);

  const handleDonate = async (e) => {
    e.preventDefault();

    // Update the received amount based on the donation
    const updatedRequest = {
      ...request,
      received: request.received + donationAmount,
    };

    // Update local storage with the new request data
    const existingRequests = JSON.parse(localStorage.getItem('currentRequests') || '[]');
    const updatedRequests = existingRequests.map(r =>
      r.id.toString() === updatedRequest.id ? updatedRequest : r
    );
    localStorage.setItem('currentRequests', JSON.stringify(updatedRequests));

    // Simulate a delay for donation processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirect to the donate page with updated values as query parameters
    router.push(`/goods/donate?updatedId=${updatedRequest.id}&received=${updatedRequest.received}`);
};


  // Loading state if request is not set
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
                onChange={(e) => setDonationAmount(Math.max(1, parseInt(e.target.value)))}
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
