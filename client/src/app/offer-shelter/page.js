'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function OfferShelter() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    availableSpots: 1,
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/offer-shelter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          address: '',
          city: '',
          state: 'FL',
          zipCode: '',
          availableSpots: 1,
          description: '',
        });
        setTimeout(() => router.push('/shelter'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while submitting your offer.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Offer Your Home as Shelter</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Your offer has been submitted successfully! Redirecting...</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="city" className="block mb-1">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="state" className="block mb-1">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block mb-1">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="availableSpots" className="block mb-1">Available Spots:</label>
            <input
              type="number"
              id="availableSpots"
              name="availableSpots"
              value={formData.availableSpots}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Submit Offer
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}