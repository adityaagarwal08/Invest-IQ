# Stock Scoring Platform

## Overview

This is a stock scoring platform built with React and Express, designed to analyze and rank Nifty 50 companies using configurable scoring algorithms. The application provides a comprehensive dashboard for viewing company rankings, detailed analyses, and customizable scoring parameters.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack Architecture
The application uses a modern full-stack approach with:
- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but currently using in-memory storage)
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: React Context API for scoring weights, React Query for server state

### Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts for state management
│   │   ├── data/         # Mock data and types
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configurations
│   │   └── pages/        # Route components
├── server/               # Backend Express application
├── shared/               # Shared types and schemas between client/server
└── migrations/           # Database migration files
```

## Key Components

### Frontend Components
- **Header**: Navigation and settings access
- **CompanyCard**: Individual company display with scoring information
- **RankingTable**: Paginated table of all companies with filtering
- **ScoreChart**: Detailed scoring breakdown visualization
- **SettingsPanel**: Configurable scoring weights interface

### Backend Structure
- **Express Server**: RESTful API endpoints (currently minimal setup)
- **Storage Interface**: Abstracted data layer with in-memory implementation
- **Route Registration**: Modular route handling system

### Database Schema
- **Users Table**: Basic user authentication structure
- **Schema Definition**: Using Drizzle ORM with PostgreSQL dialect
- **Type Safety**: Generated TypeScript types from schema

## Data Flow

### Scoring Algorithm
1. **Input Data**: Company financial metrics (P/E, D/E, ROE, P/B ratios, shareholder patterns)
2. **Weight Application**: User-configurable weights for different scoring categories
3. **Score Calculation**: Complex algorithm combining absolute and relative scoring
4. **Ranking**: Companies sorted by final composite scores

### State Management
1. **Scoring Context**: Global state for scoring weights and presets
2. **React Query**: Caching and synchronization for API data
3. **Local Storage**: Persistence of user preferences

### UI Interactions
1. **Settings Configuration**: Real-time weight adjustments with live preview
2. **Company Navigation**: Routing between list view and detailed company pages
3. **Responsive Design**: Mobile-first approach with desktop enhancements

## External Dependencies

### Frontend Libraries
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Data Visualization**: Recharts for financial charts and graphs
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom financial dashboard theme

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle with type-safe query builder
- **Session Management**: PostgreSQL session store
- **Validation**: Zod for runtime type checking

### Development Tools
- **Build Tool**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Development**: Hot module replacement and error overlay
- **Deployment**: ESBuild for server bundling

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Frontend development with HMR
- **Express Server**: Backend API development with tsx runner
- **Database**: Development database with Drizzle migrations
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Production Build
- **Frontend Build**: Vite builds to `dist/public` directory
- **Backend Build**: ESBuild bundles server to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database Migrations**: Automated schema deployment with Drizzle

### Configuration Management
- **Environment-based**: Different configs for development/production
- **Database URL**: Required environment variable for PostgreSQL
- **Build Scripts**: Separate build processes for client and server
- **Process Management**: Node.js production server with proper error handling

The application is designed to be easily deployable on platforms like Replit, with built-in support for development tooling and production optimization.