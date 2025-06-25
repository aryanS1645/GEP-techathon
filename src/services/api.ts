import { SummaryData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchDailySummary = async (): Promise<SummaryData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/run_daily_summary`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    localStorage.removeItem('daily_summary');
    const data = await response.json();
    localStorage.setItem('daily_summary', JSON.stringify(data));
    return data;
    
  } catch (error) {
    console.error('Error fetching daily summary:', error);
    // Return mock data for demo purposes
    const data = {
  "email_summary": "## Email Summary\n\n### High Priority\n\n- **Project Status Update** - Review needed\n- **Quarterly Review Documents** - Submit by month end",
  "calendar_summary": "## Meeting Schedule\n\n### Today\n\n- 10:00 - 10:15 Daily Standup\n- 14:00 - 15:00 Project Review",
  "jira_summary": "## JIRA Tickets\n\n### Medium Priority\n- [SCRUM-1] Complete API for CRUD operations",
  "teams_summary": "## Teams Messages\n\n### Important Conversations\n- **Project Manager** - Update tasks by EOD\n- **Tech Lead** - API bottleneck identified",
  "final_summary": "## Daily Briefing\n\n**Executive Summary:** Critical items include project status review and sprint planning preparation."
}
    localStorage.setItem('daily_summary', JSON.stringify(data))
    // return {
    //   email_summary: "## Email Summary\n\n### High Priority\n\n- **Project Status Update** - Review needed\n- **Quarterly Review Documents** - Submit by month end",
    //   calendar_summary: "## Meeting Schedule\n\n### Today\n\n- 10:00 - 10:15 Daily Standup\n- 14:00 - 15:00 Project Review",
    //   jira_summary: "## JIRA Tickets\n\n### Medium Priority\n- [SCRUM-1] Complete API for CRUD operations",
    //   teams_summary: "## Teams Messages\n\n### Important Conversations\n- **Project Manager** - Update tasks by EOD\n- **Tech Lead** - API bottleneck identified",
    //   final_summary: "## Daily Briefing\n\n**Executive Summary:** Critical items include project status review and sprint planning preparation.",
    //   // error: null
    // };
    return data;
  }
};

export const sendJiraChatMessage = async (message: string, chatHistory: any[]): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/jira/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": `${message}`,
        "thread_id": "1234"
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "I'm currently unable to process your request. Please try again later.";
  }
};

export const sendCalendarChatMessage = async (message: string, chatHistory: any[]): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/calendar/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": `${message}`,
        "thread_id": "1233"
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "I'm currently unable to process your request. Please try again later.";
  }
};

export const sendGmailChatMessage = async (message: string, chatHistory: any[]): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/gmail/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": `${message}`,
        "thread_id": "1232"
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "I'm currently unable to process your request. Please try again later.";
  }
};

export const sendSlackChatMessage = async (message: string, chatHistory: any[]): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/slack/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": `${message}`,
        "thread_id": "1231"
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "I'm currently unable to process your request. Please try again later.";
  }
};


export const createJiraTicket = async (ticketData: any): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jira/create-ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.ticketId;
  } catch (error) {
    console.error('Error creating Jira ticket:', error);
    throw error;
  }
};

export const summarizeJiraTicket = async (ticketId: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/jira/summarize-ticket/${ticketId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error('Error summarizing Jira ticket:', error);
    throw error;
  }
};