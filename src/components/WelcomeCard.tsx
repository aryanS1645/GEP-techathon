import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sparkles, CheckCircle, Calendar, Mail, MessageSquare, FileText, Sun, Moon } from 'lucide-react';


const WelcomeCard: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        relative overflow-hidden
        ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'}
        rounded-2xl shadow-xl border
        ${isDark ? 'border-gray-700' : 'border-blue-200'}
        p-8
        transition-all
      `}
    >
      {/* Decorative Sparkles */}
      <Sparkles
        size={48}
        className="absolute -top-6 -left-6 text-blue-400 opacity-30 animate-pulse"
      />
      <Sparkles
        size={32}
        className="absolute top-4 right-8 text-yellow-400 opacity-20 animate-spin-slow"
      />

      <h2 className={`text-3xl font-extrabold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>
        <span>Welcome to Your Personal Assistant</span>
        <span className="animate-bounce"><Sun size={28} className="inline text-yellow-400" /></span>
      </h2>

      <div className={`${isDark ? 'text-gray-200' : 'text-gray-700'} space-y-6`}>
        <p className="text-lg">
          <span className="font-semibold text-blue-500">Boost your productivity</span> by consolidating your <span className="font-semibold">emails</span>, <span className="font-semibold">calendar</span>, <span className="font-semibold">Slack</span> messages, and <span className="font-semibold">Jira</span> tickets into one beautiful dashboard.
        </p>

        <div>
          <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>
            <CheckCircle size={20} className="text-green-500" />
            Key Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-400" />
              <span><strong>Email Summary:</strong> Actionable highlights</span>
            </li>
            <li className="flex items-center gap-2">
              <Calendar size={18} className="text-purple-400" />
              <span><strong>Calendar Summary:</strong> Meetings & prep notes</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-400" />
              <span><strong>Slack Summary:</strong> Key conversations</span>
            </li>
            <li className="flex items-center gap-2">
              <FileText size={18} className="text-yellow-400" />
              <span><strong>Agents:</strong> Assistant Chatbots</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              <span><strong>Todo List:</strong> Unified action items</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={`font-semibold mb-2 flex items-center gap-2 ${isDark ? 'text-white' : 'text-blue-900'}`}>
            <Sparkles size={18} className="text-pink-400" />
            Modes Available
          </h3>
          <ul className="flex flex-wrap gap-4 text-base">
            <li className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
              <Sun size={16} className="text-yellow-400" />
              <span><strong>Immediate:</strong> Get summaries now</span>
            </li>
            <li className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
              <Moon size={16} className="text-purple-400" />
              <span><strong>Scheduled:</strong> Automate your day</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <span className="text-base italic flex-1">
            <Sparkles size={18} className="inline text-blue-400 mr-1 animate-pulse" />
            Select a section from the sidebar to get started!
          </span>
          <span className="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 font-semibold shadow-lg animate-fade-in">
            Ready. Set. Organize!
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;