import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles} from 'lucide-react';
import { sendJiraChatMessage, summarizeJiraTicket } from '../services/api';
import { ChatMessage } from '../types';
import { useTheme } from '../contexts/ThemeContext';


const JiraChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'create' | 'summarize'>('chat');
  const [ticketId, setTicketId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setMode('chat');
    setTicketId('');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      let botResponse = '';
      
      if (mode === 'summarize' && ticketId) {
        botResponse = await summarizeJiraTicket(ticketId);
      } else {
        botResponse = await sendJiraChatMessage(inputMessage, messages);
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`
        relative rounded-2xl shadow-2xl border
        ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100 border-blue-200'}
        flex flex-col h-[600px] transition-all
      `}
    >
      {/* Decorative Sparkles */}
      <Sparkles
        size={40}
        className="absolute -top-5 left-4 text-blue-400 opacity-20 animate-pulse pointer-events-none"
      />
      <Sparkles
        size={28}
        className="absolute top-8 right-8 text-yellow-400 opacity-10 animate-spin-slow pointer-events-none"
      />

      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-blue-200'} flex items-center justify-between bg-transparent`}>
        <h2 className={`text-2xl font-extrabold flex items-center gap-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>
          <Bot size={24} className="text-blue-500" />
          Jira Assistant
        </h2>
        <div className="flex gap-2">
          <button
            onClick={clearChat}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-blue-100 text-blue-500'} transition-colors`}
            title="Clear Chat"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.length === 0 && (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-blue-600'} text-lg font-medium`}>
            <Sparkles size={20} className="inline mr-2 animate-pulse text-blue-400" />
            Ask me anything about your Jira tickets...
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className={`w-9 h-9 rounded-full ${isDark ? 'bg-blue-700' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <Bot size={18} className="text-white" />
              </div>
            )}

            <div
              className={`
                max-w-[75%] px-5 py-3 rounded-2xl shadow
                ${message.sender === 'user'
                  ? isDark ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'
                  : isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                }
                border
                ${message.sender === 'user'
                  ? isDark ? 'border-blue-800' : 'border-blue-400'
                  : isDark ? 'border-gray-700' : 'border-gray-200'
                }
              `}
            >
              <p className="text-base whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.sender === 'user' && (
              <div className={`w-9 h-9 rounded-full ${isDark ? 'bg-gray-700' : 'bg-blue-200'} flex items-center justify-center flex-shrink-0 shadow-md`}>
                <User size={18} className="text-blue-500" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-9 h-9 rounded-full ${isDark ? 'bg-blue-700' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0 shadow-md`}>
              <Bot size={18} className="text-white" />
            </div>
            <div className={`px-5 py-3 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-5 border-t ${isDark ? 'border-gray-700' : 'border-blue-200'} bg-transparent`}>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Ask me about Jira tickets..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={`
              flex-1 px-5 py-3 rounded-2xl border transition-colors shadow
              ${isDark
                ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-white border-blue-200 text-gray-900 placeholder-blue-400 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
              disabled:opacity-50
              text-base
            `}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:bg-gray-400 text-white rounded-2xl transition-colors flex items-center gap-2 shadow font-semibold text-base"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JiraChatbot;