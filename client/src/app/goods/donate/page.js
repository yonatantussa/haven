'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';

export default function DonateGoods() {
  const [requests, setRequests] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Fetch existing requests from local storage
    const existingRequests = JSON.parse(localStorage.getItem('currentRequests') || '[]');
    
    // Filter out requests where requested equals received
    const filteredRequests = existingRequests.filter(req => req.requested > req.received);
    setRequests(filteredRequests);

    // Handle the incoming formData parameter
    const formDataParam = searchParams.get('formData');
    if (formDataParam) {
      const newRequest = JSON.parse(decodeURIComponent(formDataParam));
  
      const formattedRequest = {
        id: new Date().getTime(), // Temporary unique ID
        organization: newRequest.organizationName,
        item: newRequest.itemName,
        requested: parseInt(newRequest.quantity),
        received: 0,
        description: newRequest.description,
      };

      // Check if the request already exists
      const isDuplicate = existingRequests.some(req => 
        req.item === formattedRequest.item &&
        req.organization === formattedRequest.organization &&
        req.requested === formattedRequest.requested
      );

      // If it's not a duplicate, add to the local storage
      if (!isDuplicate) {
        existingRequests.push(formattedRequest);
        localStorage.setItem('currentRequests', JSON.stringify(existingRequests));

        // Filter and update state with all requests including the new one
        const updatedRequests = existingRequests.filter(req => req.requested > req.received);
        setRequests(updatedRequests);
      }
    }
  }, [searchParams]);

  const handleDonate = (requestId) => {
    const selectedRequest = requests.find(req => req.id === requestId);
    // Redirect to the single item donation page with the selected request ID
    router.push(`/goods/donate/${requestId}`);
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Donate Goods</h1>
        {requests.length === 0 ? (
          <p>No requests to display</p>
        ) : (
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
        )}
      </div>
    </AuthenticatedLayout>
  );
}
