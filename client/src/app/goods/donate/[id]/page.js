
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DonateSingleItem() {
  const [request, setRequest] = useState(null);
  const [donationAmount, setDonationAmount] = useState(1); // Default donation amount
  const router = useRouter();

  useEffect(() => {
    // Get the current requests from local storage
    const existingRequests = JSON.parse(localStorage.getItem('currentRequests') || '[]');
    
    // Get the requestId from the URL
    const requestId = window.location.pathname.split('/').pop();

    // Find the specific request
    const selectedRequest = existingRequests.find(req => req.id === parseInt(requestId));

    if (selectedRequest) {
      setRequest(selectedRequest);
      setDonationAmount(1); // Reset donation amount when loading a new request
    }
  }, []);

  const handleConfirmDonation = () => {
    // Update the existing requests in local storage
    const existingRequests = JSON.parse(localStorage.getItem('currentRequests') || '[]');

    const updatedRequests = existingRequests.map((req) => {
      if (req.id === request.id) {
        return { ...req, received: req.received + donationAmount }; // Increment the received count by the donation amount
      }
      return req;
    });

    // Save the updated requests back to local storage
    localStorage.setItem('currentRequests', JSON.stringify(updatedRequests));

    // Refresh the request state to update options
    setRequest(prevRequest => ({
      ...prevRequest,
      received: prevRequest.received + donationAmount // Update received amount
    }));

    // Optionally reset donationAmount if you want to clear the selection
    setDonationAmount(1); 

    // Redirect back to the DonateGoods page
    router.push('/goods/donate');
  };

  if (!request) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // Calculate remaining amount and check if the donation is complete
  const remainingAmount = request.requested - request.received;
  const isDonationComplete = remainingAmount <= 0;

  // Generate options for donation amount based on the remaining amount
  const donationOptions = Array.from({ length: remainingAmount }, (_, index) => index + 1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Donate Item</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">{request.organization}</h2>
        <p className="mb-2">Item: {request.item}</p>
        <p className="mb-2">Requested: {request.requested}</p>
        <p className="mb-4">Received: {request.received}</p>
        
        {/* Select input for donation amount */}
        <div className="mb-4">
          <label htmlFor="donationAmount" className="block text-sm font-medium mb-2">
            Select Amount to Donate:
          </label>
          <select
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(parseInt(e.target.value))}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            disabled={isDonationComplete} // Disable the select input if donation is complete
          >
            {/* Use the dynamically generated options */}
            {donationOptions.map(amount => (
              <option key={amount} value={amount}>{amount}</option>
            ))}
          </select>
        </div>

        {/* Message to display when the donation is complete */}
        {isDonationComplete && (
          <div className="mb-4 text-red-600 font-semibold">
            You have already received the requested amount for this item.
          </div>
        )}
        
        <button
          onClick={handleConfirmDonation}
          className={`w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${isDonationComplete ? 'opacity-50 cursor-not-allowed' : ''}`} // Adjust button style if disabled
          disabled={isDonationComplete} // Disable button if donation is complete
        >
          Confirm Donation
        </button>
      </div>
    </div>
  );
}

