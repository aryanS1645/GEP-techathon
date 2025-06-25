import React, { useState, useEffect } from 'react';
import { SummaryData } from '../types';
import { fetchDailySummary } from '../services/api';
import ModeSelector from './ModeSelector';
import ScheduleSelector from './ScheduleSelector';
import SummaryCard from './SummaryCard';
import JiraChatbot from './JiraChatbot';
import WelcomeCard from './WelcomeCard';
import CalendarChatbot from './CalendarChatbot';
import EmailChatbot from './EmailChatbot';
import TodoList from './TodoList';
import SlackChatbot from './SlackChatbot';

interface SectionViewProps {
  section: string;
}

const SectionView: React.FC<SectionViewProps> = ({ section }) => {
  const [mode, setMode] = useState<'immediate' | 'scheduled'>('immediate');
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  
  useEffect(() => {
    if (section === 'home') {
      loadSummaryData();
    }
  }, [section, mode]);

  const loadSummaryData = async () => {
    setLoading(true);
    try {
      const data = await fetchDailySummary();
      setSummaryData(data);
    } catch (error) {
      console.error('Error loading summary data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = (date: Date) => {
    setScheduledTime(date);
    // In a real app, this would schedule the summary generation
    console.log('Scheduled summary for:', date);
    // For demo purposes, we'll just load the data immediately
    loadSummaryData();
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'email': return 'Email Summary';
      case 'calendar': return 'Calendar Summary';
      case 'teams': return 'Slack Summary';
      case 'jira': return 'Jira Assistant';
      case 'todo': return 'Todo List';
      default: return 'Dashboard';
    }
  };

  // const getSectionContent = () => {
  //   if (!summaryData) return '';
    
  //   switch (section) {
  //     case 'email': return summaryData.email_summary;
  //     case 'calendar': return summaryData.calendar_summary;
  //     case 'teams': return summaryData.teams_summary;
  //     case 'todo': return summaryData.final_summary;
  //     default: return '';
  //   }
  // };

  const getSectionContent = () => {
  const storedData = localStorage.getItem('daily_summary');
  if (!storedData) return '';

  let data: {
    email_summary?: string;
    calendar_summary?: string;
    slack_summary?: string;
    final_summary?: string;
  };

  try {
    data = JSON.parse(storedData);
  } catch (err) {
    console.error("Failed to parse daily_summary from localStorage:", err);
    return '';
  }

  switch (section) {
    case 'email':
      return data.email_summary || '';
    case 'calendar':
      return data.calendar_summary || '';
    case 'teams':
      return data.slack_summary || '';
    case 'todo':
      return data.final_summary || '';
    default:
      return '';
  }
};


  if (section === 'home') {
    return <WelcomeCard />;
  }

  if (section === 'jira') {
    return <JiraChatbot />;
  }

  if (section === 'calendarbot') {
  return <CalendarChatbot />;
}
if (section === 'emailbot') {
  return <EmailChatbot />;
}
if (section === 'slackbot') {
  return <SlackChatbot />;
}

if (section === 'todo') {
  let todoItems: any[] = [];
  const storedData = localStorage.getItem('daily_summary');
  if (storedData) {
    try {
      const parsed = JSON.parse(storedData);
      // Check for nested todo_list.todo_list
      if (
        parsed.todo_list &&
        Array.isArray(parsed.todo_list.todo_list)
      ) {
        todoItems = parsed.todo_list.todo_list;
        console.log("Todo items:", todoItems);
      }
    } catch (err) {
      console.error("Failed to parse daily_summary from localStorage:", err);
    }
  }
  return <TodoList items={todoItems} />;
}

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {getSectionTitle()}
      </h1>
      
      <ModeSelector mode={mode} onModeChange={setMode} />
      
      {mode === 'scheduled' && (
        <ScheduleSelector onSchedule={handleSchedule} />
      )}
      
      {scheduledTime && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            Summary scheduled for: {scheduledTime.toLocaleString()}
          </p>
        </div>
      )}
      
      <SummaryCard
        title={getSectionTitle()}
        content={getSectionContent()}
        loading={loading}
      />
    </div>
  );
};

export default SectionView;