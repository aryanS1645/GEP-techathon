import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, FileText, Plus } from 'lucide-react';
import { sendJiraChatMessage, createJiraTicket, summarizeJiraTicket } from '../services/api';
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
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col h-[600px]`}>
      {/* Header */}
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Jira Assistant
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('chat')}
            className={`
              px-3 py-1 rounded text-sm font-medium transition-colors
              ${mode === 'chat'
                ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }
            `}
          >
            Chat
          </button>
          <button
            onClick={() => setMode('create')}
            className={`
              flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-colors
              ${mode === 'create'
                ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }
            `}
          >

            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Ticket ID Input for Summarize Mode */}
      {mode === 'summarize' && (
        <div className={`p-3 border-b ${isDark ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'}`}>
          <input
            type="text"
            placeholder="Enter Jira ticket ID (e.g., PROJ-123)"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            className={`
              w-full px-3 py-2 rounded border text-sm
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
            `}
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            {mode === 'create' && 'Ask me to help you create a Jira ticket...'}
            {mode === 'summarize' && 'Enter a ticket ID above and ask me to summarize it...'}
            {mode === 'chat' && 'Ask me anything about your Jira tickets...'}
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0`}>
                <Bot size={16} className="text-white" />
              </div>
            )}
            
            <div
              className={`
                max-w-[80%] px-4 py-2 rounded-lg
                ${message.sender === 'user'
                  ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDark ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'
                }
              `}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
            
            {message.sender === 'user' && (
              <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'} flex items-center justify-center flex-shrink-0`}>
                <User size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center flex-shrink-0`}>
              <Bot size={16} className="text-white" />
            </div>
            <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={
              mode === 'create' ? 'Describe the ticket you want to create...' :
              mode === 'summarize' ? 'Ask me to summarize the ticket...' :
              'Ask me about Jira tickets...'
            }
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className={`
              flex-1 px-4 py-2 rounded-lg border transition-colors
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
              disabled:opacity-50
            `}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim() || (mode === 'summarize' && !ticketId.trim())}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JiraChatbot;