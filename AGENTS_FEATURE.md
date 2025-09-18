# Agents Feature Documentation

## Overview

The "Agents Feature" in this TD Studios Cannabis Menu application is a **real-time comments system** that allows users to leave feedback, questions, or comments that are stored in a PostgreSQL database and displayed to all users. This feature enables interactive communication between users and potentially with automated agents or moderators.

## Architecture

### Backend API (`/api/comments.ts`)

The comments system is built on a Vercel serverless function that handles all comment operations:

**Database Schema:**
```sql
CREATE TABLE IF NOT EXISTS comments (
  id serial PRIMARY KEY,
  comment text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

**API Endpoints:**

- **POST `/api/comments`** - Create a new comment
  - Body: `{ comment: string }`
  - Response: `{ id, comment, created_at }`
  - Status: 201 on success, 400 for missing comment

- **GET `/api/comments`** - Retrieve comments (latest 100)
  - Response: `{ items: [{ id, comment, created_at }] }`
  - Ordered by: `created_at DESC`

- **OPTIONS `/api/comments`** - CORS preflight support

**Environment Variables Required:**
- `POSTGRES_URL` or `DATABASE_URL` - PostgreSQL connection string

### Frontend Component (`/src/components/CommentsBox.tsx`)

A React component that provides the user interface for the comments system:

**Features:**
- Real-time comment submission
- Comment list display (latest 100)
- Loading states and error handling
- Responsive design with glassmorphism styling
- Auto-refresh after submission

**State Management:**
```typescript
const [items, setItems] = useState<Item[]>([]);     // Comments list
const [comment, setComment] = useState('');         // Current input
const [loading, setLoading] = useState(false);      // Submission state
const [error, setError] = useState<string | null>(null); // Error handling
```

## How It Works

### 1. Data Flow

```
User Input → CommentsBox Component → API Endpoint → PostgreSQL Database
                ↑                                        ↓
User Interface ← Comment List Update ← Database Query ←──┘
```

### 2. User Interaction Flow

1. **Loading Comments**: Component automatically fetches existing comments on mount
2. **Submitting Comments**: User types comment and clicks submit
3. **Real-time Updates**: After submission, component refreshes the comment list
4. **Error Handling**: Network errors and validation errors are displayed to user

### 3. Database Operations

- **Auto Table Creation**: Database table is created automatically if it doesn't exist
- **Comment Storage**: Each comment gets an auto-incremented ID and timestamp
- **Query Optimization**: Limited to 100 most recent comments for performance

## Integration Guide

### Using the CommentsBox Component

```tsx
import CommentsBox from '@/components/CommentsBox';

function MyPage() {
  return (
    <div className="container">
      <h1>Page Content</h1>
      <CommentsBox />
    </div>
  );
}
```

### Styling

The component uses Tailwind CSS with a glassmorphism design that fits the TD Studios aesthetic:

- Semi-transparent backgrounds (`bg-white/10`)
- Blur effects (`backdrop-blur-md`)
- Border highlights (`border-white/20`)
- Hover states and transitions

### Database Setup

1. **PostgreSQL Database**: Set up a PostgreSQL instance (Neon, Supabase, etc.)
2. **Environment Variables**: Add connection string to `.env.local`
3. **Auto-Migration**: Tables are created automatically on first API call

## Current Usage

Based on the codebase analysis, the comments feature is currently:

- **Available but not actively used** in main pages
- **Referenced in forms** as a potential website feature (`CustomWebsiteForm.tsx`)
- **Ready for integration** into any page component

## Development Commands

```bash
# Start development server
npm run dev

# Test the API endpoint
curl -X POST http://localhost:8082/api/comments \
  -H "Content-Type: application/json" \
  -d '{"comment": "Test comment"}'

# Get comments
curl http://localhost:8082/api/comments
```

## Future Enhancements

Potential improvements for the agents feature:

1. **User Authentication**: Associate comments with specific users
2. **Moderation Tools**: Admin interface for managing comments
3. **Real-time Updates**: WebSocket integration for live updates
4. **Comment Threading**: Reply functionality for conversations
5. **Agent Integration**: Automated responses from AI agents
6. **Rich Text Support**: Markdown or rich text formatting
7. **File Attachments**: Image and document uploads
8. **Notification System**: Email alerts for new comments

## Security Considerations

- **Input Validation**: Comments are validated on both client and server
- **SQL Injection Protection**: Using parameterized queries with Neon
- **Rate Limiting**: Consider implementing to prevent spam
- **Content Moderation**: No profanity filter currently implemented
- **CORS**: Properly configured for cross-origin requests

## Error Handling

The system handles various error scenarios:

- **Database Connection Errors**: Graceful fallback with error messages
- **Network Issues**: User-friendly error display
- **Validation Errors**: Clear feedback for missing or invalid input
- **Server Errors**: Comprehensive error logging and user notification

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Database**: PostgreSQL (via Neon serverless)
- **API**: RESTful JSON API
- **Development**: Vite, ESLint, Node.js

## Deployment

The comments feature is deployed automatically with the main application:

- **Vercel**: Serverless functions auto-deploy
- **Database**: Persistent PostgreSQL storage
- **Environment**: Production environment variables required
- **Monitoring**: Check Vercel function logs for issues

This agents feature provides a solid foundation for user interaction and can be extended to support more sophisticated agent-based functionality in the future.