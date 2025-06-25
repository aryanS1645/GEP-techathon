import React, { useState } from 'react';

interface TodoItem {
  title: string;
  description: string;
  time: string;
}

interface TodoListProps {
  items: TodoItem[];
}

const colorMap = ['bg-pink-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400'];

const TodoList: React.FC<TodoListProps> = ({ items }) => {
  const [done, setDone] = useState<boolean[]>(items.map(() => false));

  const toggleDone = (idx: number) => {
    setDone((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Today's Main Focus</h2>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.title}
              className={`flex items-center justify-between rounded-xl px-5 py-4 shadow border transition-colors border-gray-100 bg-gray-50
                ${done[idx] ? 'bg-green-100 border-green-400' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${colorMap[idx % colorMap.length]}`}></span>
                <div>
                  <div className={`font-semibold text-gray-800 ${done[idx] ? 'line-through' : ''}`}>
                    {item.title}
                  </div>
                  <div className="text-gray-500 text-sm">{item.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-sm">{item.time}</span>
                <button
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${done[idx] ? 'border-green-500 bg-green-400' : 'border-purple-400'}
                  `}
                  onClick={() => toggleDone(idx)}
                  aria-label={done[idx] ? 'Mark as not done' : 'Mark as done'}
                >
                  {done[idx] ? (
                    // Checkmark icon
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="w-3 h-3 rounded-full bg-purple-300"></span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;