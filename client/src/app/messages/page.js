'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBox, FaPaperPlane } from 'react-icons/fa';

// Sample conversation data
const sampleConversations = [
  {
    id: 1,
    name: 'Disaster Relief Chat',
    messages: [
      { id: 1, sender_id: 1, content: 'Hello, I need assistance with finding temporary shelter.', sent_at: '2024-09-28T08:45:00Z' },
      { id: 2, sender_id: 2, content: 'I can help with that. Where are you located?', sent_at: '2024-09-28T08:50:00Z' },
      { id: 3, sender_id: 1, content: 'I am in the downtown area.', sent_at: '2024-09-28T08:55:00Z' },
    ],
  },
  {
    id: 2,
    name: 'Support Group Chat',
    messages: [
      { id: 1, sender_id: 1, content: 'Any updates on the supplies?', sent_at: '2024-09-28T09:00:00Z' },
      { id: 2, sender_id: 2, content: 'Yes, they are arriving tomorrow.', sent_at: '2024-09-28T09:05:00Z' },
    ],
  },
];

export default function ChatApp({ currentUser }) {
  const [activeConversation, setActiveConversation] = useState(sampleConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of messages when they change
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: activeConversation.messages.length + 1,
      sender_id: currentUser.id,
      content: newMessage,
      sent_at: new Date().toISOString(),
    };

    // Update the conversation with the new message
    const updatedConversations = sampleConversations.map((conv) =>
      conv.id === activeConversation.id
        ? { ...conv, messages: [...conv.messages, newMessageObj] }
        : conv
    );

    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, newMessageObj],
    });
    setNewMessage('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with chat list */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <ul>
          {sampleConversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`p-4 mb-2 cursor-pointer rounded-lg ${
                activeConversation.id === conversation.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main chat area */}
      <div className="w-3/4 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{activeConversation.name}</h2>
          <Link href="/goods" className="hover:bg-blue-700 text-white p-2 rounded-full transition duration-150 ease-in-out">
            <FaBox size={24} />
          </Link>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {activeConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                currentUser?.id && message?.sender_id && message.sender_id === currentUser.id
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg shadow-md ${
                  currentUser?.id && message?.sender_id && message.sender_id === currentUser.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs mt-1 opacity-75 text-right">
                  {new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full py-2 px-6 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaPaperPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}