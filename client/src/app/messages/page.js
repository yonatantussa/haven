'use client';
import { useState, useEffect } from 'react';
import ChatInterface from '../components/ChatInterface';
import { FaSearch } from 'react-icons/fa';
import Navigation from '../components/Navigation';
export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // Sample conversations and messages
    
    const sampleConversations = [
      {
        id: 1,
        name: 'John Doe',
        lastMessage: 'Thanks for your help with the donation!',
        timestamp: '10:30 AM',
        messages: [
          { id: 1, sender_id: 2, content: "Hi there! I saw your post about needing blankets.", sent_at: "2023-06-10T10:00:00Z" },
          { id: 2, sender_id: 1, content: "Yes, we're in need of about 50 blankets for the homeless shelter.", sent_at: "2023-06-10T10:05:00Z" },
          { id: 3, sender_id: 2, content: "I have 20 blankets I can donate. Where should I drop them off?", sent_at: "2023-06-10T10:10:00Z" },
          { id: 4, sender_id: 1, content: "That's fantastic! You can bring them to 123 Main St. Thank you so much!", sent_at: "2023-06-10T10:15:00Z" },
          { id: 5, sender_id: 2, content: "Great, I'll drop them off tomorrow. Happy to help!", sent_at: "2023-06-10T10:20:00Z" },
          { id: 6, sender_id: 1, content: "Thanks for your help with the donation!", sent_at: "2023-06-10T10:30:00Z" },
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        lastMessage: 'The canned goods have been delivered.',
        timestamp: 'Yesterday',
        messages: [
          { id: 1, sender_id: 1, content: "Hello Jane, do you have any canned goods to donate?", sent_at: "2023-06-09T14:00:00Z" },
          { id: 2, sender_id: 2, content: "Hi! Yes, I have about 100 cans. Where are they needed?", sent_at: "2023-06-09T14:30:00Z" },
          { id: 3, sender_id: 1, content: "That's wonderful! We need them at the food bank on 456 Oak St.", sent_at: "2023-06-09T14:35:00Z" },
          { id: 4, sender_id: 2, content: "Perfect, I'll have them delivered tomorrow.", sent_at: "2023-06-09T14:40:00Z" },
          { id: 5, sender_id: 2, content: "The canned goods have been delivered.", sent_at: "2023-06-10T09:00:00Z" },
        ]
      },
      {
        id: 3,
        name: 'Local Shelter',
        lastMessage: 'We still need volunteers for next week.',
        timestamp: '2 days ago',
        messages: [
          { id: 1, sender_id: 2, content: "Hello! We're looking for volunteers for next week's event.", sent_at: "2023-06-08T11:00:00Z" },
          { id: 2, sender_id: 1, content: "Hi there! What kind of help do you need?", sent_at: "2023-06-08T11:30:00Z" },
          { id: 3, sender_id: 2, content: "We need people to help serve meals and organize donations.", sent_at: "2023-06-08T11:35:00Z" },
          { id: 4, sender_id: 1, content: "I can help with organizing donations. What day and time?", sent_at: "2023-06-08T11:40:00Z" },
          { id: 5, sender_id: 2, content: "Great! We need help on Tuesday from 2-6 PM. Can you make it?", sent_at: "2023-06-08T11:45:00Z" },
          { id: 6, sender_id: 1, content: "Tuesday works for me. I'll be there!", sent_at: "2023-06-08T11:50:00Z" },
          { id: 7, sender_id: 2, content: "Wonderful! See you then. We still need volunteers for next week.", sent_at: "2023-06-08T11:55:00Z" },
        ]
      },
    ];
    setConversations(sampleConversations);
    setCurrentUser({ id: 1, username: 'CurrentUser' });
  }, []);
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
    <Navigation />
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out ${
                selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedConversation(conv)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">{conv.name}</h3>
                <span className="text-sm text-gray-500">{conv.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3">
        <ChatInterface conversation={selectedConversation} currentUser={currentUser} />
      </div>
    </div>
    </>
  );
}