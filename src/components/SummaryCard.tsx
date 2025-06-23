import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../contexts/ThemeContext';

interface SummaryCardProps {
  title: string;
  content: string;
  loading?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, content, loading }) => {
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
        <div className="animate-pulse">
          <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
          <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`}></div>
          <div className={`h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded w-3/4`}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert' : ''}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default SummaryCard;