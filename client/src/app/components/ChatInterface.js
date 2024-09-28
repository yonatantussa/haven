'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBox, FaPaperPlane } from 'react-icons/fa';

export default function ChatInterface({ conversation, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(conversation?.messages || []);
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      conversation_id: conversation.id,
      sender: currentUser.username,
      content: newMessage,
      sent_at: new Date().toISOString(),
    };

    try {
      // Simulating sending message to backend
      setMessages([...messages, { ...message, id: messages.length + 1 }]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{conversation.name || 'Conversation'}</h2>
        <Link href="/goods" className="hover:bg-blue-700 text-white p-2 rounded-full transition duration-150 ease-in-out">
          <FaBox size={24} />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === currentUser.username ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                message.sender === currentUser.username
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-75">
                {new Date(message.sent_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
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
  );
}