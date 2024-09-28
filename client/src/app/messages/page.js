'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MessagesPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      console.log('Fetching users...'); // Debugging log
      const response = await axios.get('http://localhost:5000/users'); // Backend API URL
      console.log('Users fetched:', response.data); // Debugging log
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err); // Log the full error object
      setError('Error fetching users.');
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Users</h2>
          <div className="flex-1 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <h3 className="font-semibold text-gray-800">{user.username}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}