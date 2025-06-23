export interface SummaryData {
  email_summary: string;
  calendar_summary: string;
  jira_summary: string;
  teams_summary: string;
  final_summary: string;
  error?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ScheduleConfig {
  mode: 'immediate' | 'scheduled';
  scheduledTime?: Date;
}