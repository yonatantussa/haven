'use client';

import { useState } from 'react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import ChatbotButton from '../components/ChatbotButton';

const disasterInfo = [
  {
    title: "Earthquakes",
    description: "Sudden shaking of the ground caused by movements in the Earth's crust.",
    howToHelp: "Donate to relief organizations, volunteer for search and rescue, provide temporary housing."
  },
  {
    title: "Hurricanes",
    description: "Powerful tropical storms with strong winds and heavy rainfall.",
    howToHelp: "Contribute to disaster relief funds, assist in evacuation efforts, help with cleanup and rebuilding."
  },
  {
    title: "Floods",
    description: "Overflow of water onto normally dry land, often caused by heavy rainfall or storm surges.",
    howToHelp: "Donate supplies, volunteer for sandbagging efforts, assist in cleanup and restoration."
  },
  {
    title: "Wildfires",
    description: "Uncontrolled fires that spread quickly through vegetation in rural and urban areas.",
    howToHelp: "Support firefighting efforts, donate to affected communities, assist in reforestation projects."
  },
];

export default function LearnMore() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 relative">
        <h1 className="text-3xl font-bold mb-8">Learn About Natural Disasters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disasterInfo.map((disaster, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{disaster.title}</h2>
                <p className="text-gray-600 mb-4">{disaster.description}</p>
                {expandedCard === index && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">How to Help:</h3>
                    <p className="text-gray-600">{disaster.howToHelp}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <ChatbotButton isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
      </div>
    </AuthenticatedLayout>
  );
}
