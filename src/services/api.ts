import { SummaryData } from '../types';
 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 
// Unified Agent Chatbot API
export const sendUnifiedAgentChatMessage = async (message: string, chatHistory: any[]): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/unified/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        thread_id: "unified-agent",
        history: chatHistory,
      }),
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending unified agent chat message:', error);
    return "I'm currently unable to process your request. Please try again later.";
  }
};
 
// Jira Chatbot API
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
 
// Calendar Chatbot API
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
 
// Gmail Chatbot API
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
 
// Slack Chatbot API
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
 
// Jira Ticket Creation
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
 
// Jira Ticket Summarization
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
 
export const fetchDailySummary = async (): Promise<any> => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const response = await fetch(`${API_BASE_URL}/api/summary/daily`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching daily summary:', error);
    return null;
  }
};