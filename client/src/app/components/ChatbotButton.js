import { useState, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
export default function ChatbotButton({ isOpen, toggleChatbot }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    if (messages.length === 0) {
      sendWelcomeMessage();
    }
  }, []);
  const sendWelcomeMessage = async () => {
    const welcomeMessage = "Welcome! I'm an AI assistant specialized in natural disasters. How can I help you today?";
    setMessages([{ text: welcomeMessage, sender: 'bot' }]);
  };
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const newMessage = { text: inputMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: inputMessage,
          context: `You are an AI assistant specialized in natural disasters. Use the following guidelines:
          1. Provide concise, to-the-point responses.
          2. Focus on accuracy and relevance in your answers.
          3. If the user's query is unclear, ask a brief follow-up question for clarity.
          4. Present information in a listed format when appropriate.
          5. Provide accurate, up-to-date information about natural disasters, their causes, effects, and prevention measures.
          6. Offer empathetic but brief responses when discussing disaster impacts.
          7. Suggest a reliable source for further reading only if directly relevant.`
        }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in again.');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || response.statusText || 'An error occurred while processing your request.');
      }
      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error('JSON parsing error:', error);
        throw new Error('Error parsing response from server. Please try again.');
      }
      if (data && data.response) {
        setMessages(prevMessages => [...prevMessages, { text: data.response.trim(), sender: 'bot' }]);
      } else {
        throw new Error('Invalid or empty response from server. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = error.message;
      if (error.message === 'Unauthorized: Please log in again.') {
        localStorage.removeItem('token');  // Clear the invalid token
        errorMessage += ' Please log in and try again.';
      }
      setMessages(prevMessages => [...prevMessages, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };
  const formatMessage = (text) => {
    // Convert numbered lists to JSX
    const listRegex = /^\d+\.\s/;
    const lines = text.split('\n');
    let inList = false;
    return lines.map((line, index) => {
      if (listRegex.test(line)) {
        inList = true;
        return <li key={index}>{line.replace(listRegex, '')}</li>;
      } else if (inList) {
        inList = false;
        return <><br key={`br-${index}`} />{line}</>;
      }
      return <>{line}<br key={`br-${index}`} /></>;
    });
  };
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[32rem] bg-white rounded-lg shadow-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Haven AI</h3>
          <div className="flex-grow overflow-y-auto mb-4 bg-gray-100 rounded p-2">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                  {msg.sender === 'bot' ? formatMessage(msg.text) : msg.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded bg-gray-300">Typing...</span>
              </div>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about natural disasters..."
              className="flex-grow p-2 border rounded-l"
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}