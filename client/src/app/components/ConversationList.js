'use client';

import { useState } from 'react';

export default function ConversationList({ conversations, onSelectConversation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-1/3 bg-gray-100 p-4 rounded-l-lg">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 rounded border"
      />
      <div className="overflow-y-auto h-[400px]">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelectConversation(conv)}
            className="p-3 hover:bg-gray-200 cursor-pointer rounded"
          >
            <h3 className="font-semibold">{conv.name}</h3>
            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}