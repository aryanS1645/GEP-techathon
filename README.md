# Personal Assistant App

A comprehensive AI-powered personal assistant application built with React and TypeScript that consolidates information from Teams, Calendar, Email, and Jira into digestible summaries.

## Features

### Core Functionality
- **Dashboard**: Welcome screen with user manual and feature overview
- **Email Summary**: Prioritized email summaries with action items
- **Calendar Summary**: Meeting schedules with preparation notes
- **Teams Summary**: Important conversations and follow-ups
- **Jira Assistant**: Interactive chatbot for ticket management
- **Todo List**: Consolidated action items from all sources

### Modes
- **Immediate Mode**: Get summaries instantly
- **Scheduled Mode**: Set custom times for automated summaries (past and future)

### Jira Chatbot Features
- **Chat Mode**: General conversation about Jira tickets
- **Create Mode**: Interactive ticket creation assistance
- **Summarize Mode**: Detailed ticket summaries by ID
- **In-memory chat**: Maintains context throughout conversation
- **Clear chat**: Reset conversation history

### UI/UX Features
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Styling**: Corporate-friendly design with subtle animations
- **Markdown Rendering**: Converts API markdown responses to readable format
- **Real-time Updates**: Live data fetching and display

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Markdown** for markdown rendering
- **Date-fns** for date manipulation
- **Vite** for build tooling

### State Management
- React Context API for theme management
- Local state management with hooks

### API Integration
- Custom service layer for API calls
- Error handling and fallback data
- Mock data for demo purposes

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout.tsx       # Main layout with sidebar
│   ├── WelcomeCard.tsx  # Dashboard welcome screen
│   ├── ModeSelector.tsx # Immediate/Scheduled mode toggle
│   ├── ScheduleSelector.tsx # Time/date picker for scheduling
│   ├── SummaryCard.tsx  # Card component for displaying summaries
│   ├── JiraChatbot.tsx  # Interactive Jira assistant
│   └── SectionView.tsx  # Main content area controller
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Dark/light theme management
├── services/           # API service layer
│   └── api.ts         # API endpoints and data fetching
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared interfaces and types
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## API Endpoints

The application expects the following API endpoints:

### Primary Data Endpoint
- **GET** `https://api.personalassistant.com/v1/daily-summary`
  - Returns: JSON with keys `email_summary`, `calendar_summary`, `jira_summary`, `teams_summary`, `final_summary`
  - All values are in markdown format

### Jira Chatbot Endpoints
- **POST** `https://api.personalassistant.com/v1/jira-chat`
  - Body: `{ message: string, history: ChatMessage[] }`
  - Returns: `{ response: string }`

- **POST** `https://api.personalassistant.com/v1/jira/create-ticket`
  - Body: Ticket creation data
  - Returns: `{ ticketId: string }`

- **GET** `https://api.personalassistant.com/v1/jira/summarize-ticket/{ticketId}`
  - Returns: `{ summary: string }`

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-assistant-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables
The application uses the following API base URL (configured in `src/services/api.ts`):
```typescript
const API_BASE_URL = 'https://api.personalassistant.com/v1';
```

### Theme Persistence
Theme preferences are automatically saved to localStorage and restored on page load.

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## Usage

### Navigation
- Use the sidebar to navigate between different sections
- Click the sun/moon icon to toggle between light and dark themes
- Mobile users can access the sidebar via the hamburger menu

### Getting Summaries
1. Select a section from the sidebar (Email, Calendar, Teams, or Todo)
2. Choose between Immediate or Scheduled mode
3. For Scheduled mode, select your preferred date and time
4. View the generated summary in markdown format

### Using Jira Assistant
1. Navigate to the Jira Chatbot section
2. Choose your mode:
   - **Chat**: General assistance with Jira tickets
   - **Create**: Help creating new tickets
   - **Summarize**: Get detailed summaries of existing tickets
3. For Summarize mode, enter the ticket ID in the input field
4. Type your message and press Enter or click Send
5. Use the trash icon to clear chat history

### Scheduling Summaries
- Select dates from the past or future
- Choose specific times using the dropdown (30-minute intervals)
- Times are displayed in 12-hour format with AM/PM
- Scheduled summaries are logged to console (demo mode)

## Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions (camelCase for variables, PascalCase for components)
- Modular architecture with clear separation of concerns

### Component Guidelines
- Keep components focused and single-purpose
- Use TypeScript interfaces for all props
- Implement proper error handling
- Follow accessibility best practices

### Adding New Features
1. Create type definitions in `src/types/index.ts`
2. Add API functions to `src/services/api.ts`
3. Create reusable components in `src/components/`
4. Update the main navigation in `Layout.tsx`
5. Add routing logic in `SectionView.tsx`

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations
- Lazy loading for large content
- Efficient re-rendering with React keys
- Optimized bundle size with tree shaking
- Local caching of API responses (when applicable)

## Security Notes
- All API calls include proper error handling
- No sensitive data stored in localStorage
- CORS headers expected from API endpoints
- Input validation for user-generated content

## Future Enhancements
- Real-time notifications for scheduled summaries
- Export summaries to PDF/email
- Advanced filtering and search capabilities
- Integration with additional productivity tools
- Offline support with service workers
- Advanced analytics and insights

## Support
For technical support or feature requests, please contact the development team or create an issue in the project repository.