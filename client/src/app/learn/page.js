'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import ChatbotButton from '../components/ChatbotButton';
import Navigation from '../components/Navigation';

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

export default function LearnMoreAndNews() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chatbot toggle function
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Fetching the news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'environmental disaster OR natural disaster OR climate change', // Keywords for environmental disaster-related news
            language: 'en', // Only get articles in English
            sortBy: 'publishedAt', // Sort by latest published articles
            apiKey: '22d374823ffa40159af998a3e5d9c521' // Replace with your actual API key
          }
        });
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

        {/* Chatbot Button */}
        <ChatbotButton isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest News on Environmental Disasters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}