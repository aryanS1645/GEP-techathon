import React, { useState } from 'react';
import { 
  Calendar, 
  Mail, 
  MessageSquare, 
  FileText, 
  CheckSquare, 
  Menu, 
  X,
  Sun,
  Moon,
  Home,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [agentsDropdownOpen, setAgentsDropdownOpen] = useState(false);

  const menuItems = [
     { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'email', label: 'Email Summary', icon: Mail },
    { id: 'calendar', label: 'Calendar Summary', icon: Calendar },
    { id: 'teams', label: 'Slack Summary', icon: MessageSquare },
    { id: 'todo', label: 'Todo List', icon: CheckSquare },
    
  ];

  const agentOptions = [
    { id: 'jira', label: 'Jira Chatbot' },
    { id: 'calendarbot', label: 'Calendar Chatbot' },
    { id: 'emailbot', label: 'Email Chatbot' },
     { id: 'slackbot', label: 'Slack Chatbot' }
  ];
 return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors lg:hidden`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className={`text-xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
            OneStop
          </h1>
        </div>
        
       <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static inset-y-0 left-0 z-50
          w-64 ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${isDark ? 'border-gray-700' : 'border-gray-200'}
          pt-16 lg:pt-0
        `}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
                    ${isActive
                      ? isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : isDark
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

<div className="relative">
  <button
    onClick={() => setAgentsDropdownOpen((open) => !open)}
    className={`
      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all
      ${['jira', 'calendarbot', 'emailbot'].includes(activeSection)
        ? isDark
          ? 'bg-blue-600 text-white'
          : 'bg-blue-500 text-white'
        : isDark
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    <FileText size={18} />
    <span className="font-medium">Agents</span>
    <ChevronDown size={18} className="ml-auto" />
  </button>
  {agentsDropdownOpen && (
    <div className={`absolute left-0 mt-1 w-full rounded-lg shadow-lg z-20 ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-blue-200'}`}>
      {agentOptions.map((agent) => (
        <button
          key={agent.id}
          onClick={() => {
            onSectionChange(agent.id);
            setSidebarOpen(false);
            setAgentsDropdownOpen(false);
          }}
          className={`
            w-full text-left px-5 py-2 rounded-lg transition-colors
            ${activeSection === agent.id
              ? isDark
                ? 'bg-blue-700 text-white'
                : 'bg-blue-100 text-blue-900'
              : isDark
                ? 'hover:bg-gray-700 text-gray-300'
                : 'hover:bg-blue-50 text-gray-700'
            }
          `}
        >
          {agent.label}
        </button>
      ))}
    </div>
  )}
</div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;