# Interactive Portfolio Website with Admin Backend

## Overview

This is a full-stack interactive portfolio website with a comprehensive admin backend for content management. The application features a public-facing portfolio that showcases case studies and projects, along with a private admin interface for easily managing content without touching code. The system is built with modern web technologies and follows a clean, scalable architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using React with TypeScript, utilizing modern patterns and component-based architecture. The UI leverages shadcn/ui components for consistent design and Tailwind CSS for styling. The application uses Wouter for lightweight client-side routing and TanStack Query for efficient data fetching and state management. The frontend is organized into reusable components, pages, and hooks, with a clear separation between public portfolio views and authenticated admin interfaces.

### Backend Architecture
The server follows a RESTful API design using Express.js with TypeScript. The backend implements a clean separation of concerns with dedicated modules for database operations, authentication, routing, and storage management. The API supports full CRUD operations for project management and includes file upload capabilities for media assets. Session-based authentication is handled through Replit's OIDC integration with secure session storage.

### Database Design
The system uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema includes tables for user management (required for authentication), project storage with rich content support, and session management. Projects support draft/published states, categorization with tags, rich text content, and associated media files. The database is designed to be easily extensible for future content types.

### Authentication & Authorization
Authentication is implemented using Replit's OpenID Connect (OIDC) integration with session-based state management. The system maintains secure user sessions stored in PostgreSQL and provides middleware for protecting admin routes. The authentication flow supports automatic login redirection and handles unauthorized access gracefully.

### File Upload & Media Management
The application includes a comprehensive file upload system supporting image files with validation and size limits. Uploaded files are stored locally with plans to extend to cloud storage solutions. The system includes image preview functionality and automatic file management during content creation and editing.

### Content Management System
The admin backend provides a full-featured content management interface with form-based project creation and editing. The system supports rich text content, media uploads, draft/publish workflows, and real-time preview capabilities. Content is separated from presentation to ensure consistent styling across all projects.

## External Dependencies

- **Database**: PostgreSQL with Neon serverless connection for production scalability
- **UI Components**: Radix UI primitives via shadcn/ui for accessible, customizable components
- **Styling**: Tailwind CSS for utility-first styling with custom design tokens
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Authentication**: Replit OIDC integration for secure user authentication
- **File Processing**: Multer for handling multipart file uploads
- **Development Tools**: Vite for fast development builds and hot module replacement
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple