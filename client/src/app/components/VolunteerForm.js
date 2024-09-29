import { useState } from 'react';

export default function VolunteerForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Volunteer Information</h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="mt-2 p-2 w-full border rounded"
              required
            />
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Relevant Skills"
              className="mt-2 p-2 w-full border rounded"
              rows="3"
            ></textarea>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
          <button onClick={onClose} className="mt-2 text-sm text-blue-600 hover:underline">Close</button>
        </div>
      </div>
    </div>
  );
}
