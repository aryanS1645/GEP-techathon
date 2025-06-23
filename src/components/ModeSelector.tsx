import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ModeSelectorProps {
  mode: 'immediate' | 'scheduled';
  onModeChange: (mode: 'immediate' | 'scheduled') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  const { isDark } = useTheme();

  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onModeChange('immediate')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${mode === 'immediate'
            ? isDark 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-500 text-white'
            : isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
        `}
      >
        <Zap size={16} />
        Immediate
      </button>
      
      <button
        onClick={() => onModeChange('scheduled')}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${mode === 'scheduled'
            ? isDark 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-500 text-white'
            : isDark
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
        `}
      >
        <Clock size={16} />
        Scheduled
      </button>
    </div>
  );
};

export default ModeSelector;