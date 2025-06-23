import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const WelcomeCard: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
      <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Welcome to Your Personal Assistant
      </h2>
      
      <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-4`}>
        <p>
          This application helps you stay organized by consolidating information from your emails, 
          calendar, Teams messages, and Jira tickets into digestible summaries.
        </p>
        
        <div>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Email Summary:</strong> Important emails with action items</li>
            <li><strong>Calendar Summary:</strong> Upcoming meetings and preparation notes</li>
            <li><strong>Teams Summary:</strong> Key conversations and follow-ups</li>
            <li><strong>Jira Chatbot:</strong> Interactive assistant for tickets</li>
            <li><strong>Todo List:</strong> Consolidated action items</li>
          </ul>
        </div>
        
        <div>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Two Modes Available:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Immediate:</strong> Get summaries right now</li>
            <li><strong>Scheduled:</strong> Set custom times for automated summaries</li>
          </ul>
        </div>
        
        <p className="text-sm italic">
          Select a section from the sidebar to get started!
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;