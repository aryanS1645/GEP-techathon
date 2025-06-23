import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ScheduleSelectorProps {
  onSchedule: (date: Date) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const { isDark } = useTheme();

  const handleSchedule = () => {
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);
    onSchedule(dateTime);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = format(new Date(`2000-01-01T${time}`), 'h:mm a');
        options.push({ value: time, label: displayTime });
      }
    }
    return options;
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-4 mb-4`}>
      <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Schedule Summary
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <Calendar size={16} className="inline mr-1" />
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`
              w-full px-3 py-2 rounded-lg border transition-colors
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
            `}
          />
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <Clock size={16} className="inline mr-1" />
            Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className={`
              w-full px-3 py-2 rounded-lg border transition-colors
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20
            `}
          >
            {generateTimeOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <button
        onClick={handleSchedule}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Schedule Summary
      </button>
    </div>
  );
};

export default ScheduleSelector;