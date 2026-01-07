# 📝 FundooNotes - Full Stack Note-Taking Application

A feature-rich, production-ready note-taking application inspired by Google Keep, built with the MERN stack (MongoDB, Express, React, Node.js). It features advanced backend capabilities like Redis caching and RabbitMQ message queuing, paired with a dynamic React frontend supporting drag-and-drop, checklists, and real-time collaboration.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [User Flow](#user-flow)
- [API Routes](#api-routes)
- [Frontend Routes](#frontend-routes)
- [Authentication Flow](#authentication-flow)
- [Caching Strategy](#caching-strategy)
- [Email Notifications](#email-notifications)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## 🎯 Overview

FundooNotes is a comprehensive note-taking application that allows users to create, organize, and share notes with advanced features like:

- **Secure user authentication** with JWT
- **Real-time note management** (create, read, update, delete)
- **Advanced organization** (labels, archive, trash, pin)
- **Drag and Drop** interface for organizing notes
- **Checklists** for task management
- **Collaborative note sharing** with email notifications
- **Performance optimization** with Redis caching
- **Asynchronous email processing** with RabbitMQ

---

## ✨ Features

### 🔐 User Management
- **User Registration** - Create new account with email validation
- **User Login** - Secure JWT-based authentication
- **Password Reset** - Forgot password with token-based reset
- **Session Persistence** - Auto-login with stored tokens
- **Protected Routes** - Route guards for authenticated users

### 📝 Note Management
- **Create Notes** - Rich text notes with title and description
- **Checklists** - Create to-do lists with checkbox items
- **Drag and Drop** - Reorder notes intuitively using `@dnd-kit`
- **Edit Notes** - Update existing notes
- **Delete Notes** - Permanently delete notes
- **Pin Notes** - Keep important notes at the top
- **Archive Notes** - Archive notes for later reference
- **Trash Notes** - Move notes to trash (soft delete)
- **Restore Notes** - Restore archived or trashed notes

### 🏷️ Organization
- **Labels** - Create and manage custom labels via the Edit Labels modal
- **Apply Labels** - Tag notes with multiple labels
- **Filter by Label** - View notes by specific label
- **Search** - Search notes by title, description, or label

### 👥 Collaboration
- **Add Collaborators** - Share notes with other users
- **Email Notifications** - Automatic email when added as collaborator
- **Shared Access** - Collaborators can view and edit shared notes

### ⚡ Performance & Scalability
- **Redis Caching** - First 20 notes cached per user (1-hour TTL)
- **Cache Invalidation** - Auto-invalidate on CRUD operations
- **RabbitMQ Queue** - Asynchronous email processing
- **Optimized Queries** - Efficient MongoDB queries with indexing

### 🎨 User Interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Google Keep-inspired UI** - Clean and intuitive interface
- **Dark Mode Ready** - Modern glassmorphism design
- **Interactive Elements** - Modal dialogs, sidebar navigation, and hover effects

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | v14+ |
| **Express.js** | Web framework | v5.2.1 |
| **MongoDB** | Database | v9.0.2 |
| **Mongoose** | ODM for MongoDB | v9.0.2 |
| **Redis** | Caching layer | v5.10.0 |
| **RabbitMQ** | Message queue | v5.0.8 |
| **JWT** | Authentication | v9.0.3 |
| **Bcrypt** | Password hashing | v6.0.0 |
| **Winston** | Logging | v3.19.0 |
| **Nodemailer** | Email service | v7.0.12 |
| **Helmet** | Security headers | v8.1.0 |
| **CORS** | Cross-origin requests | v2.8.5 |
| **Morgan** | HTTP request logger | v1.10.1 |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | v19.2.3 |
| **React Router** | Client-side routing | v7.11.0 |
| **Axios** | HTTP client | v1.13.2 |
| **SASS** | CSS preprocessor | v1.97.1 |
| **Material-UI** | Component library | v7.3.6 |
| **Bootstrap** | CSS framework | v5.3.8 |
| **@dnd-kit** | Drag and Drop functionality | v6.3.1 |
| **Jest & RTL** | Unit & Component Testing | v29.x |

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React App (Port 3000)                               │   │
│  │  - Components (Header, Sidebar, NoteCard, etc.)      │   │
│  │  - Pages (Dashboard, etc.)                           │   │
│  │  - Interactve UI (DnD, Modals)                       │   │
│  │  - Services (Axios)                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Express Server (Port 5000)                          │   │
│  │  - Routes (REST API)                                 │   │
│  │  - Controllers                                       │   │
│  │  - Middleware (Auth)                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        Data Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MongoDB    │  │    Redis     │  │   RabbitMQ   │      │
│  │  (Database)  │  │   (Cache)    │  │   (Queue)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Installation

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (v4.4+)
- **Docker** (for Redis & RabbitMQ)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Fundoo_App.git
cd Fundoo_App
```

### 2. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd client
npm install
cd ..
```

### 3. Start Services (Docker)
```bash
# Redis
docker run -d --name redis-stack -p 6379:6379 redis/redis-stack:latest

# RabbitMQ
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

### 4. Configure Environment Variables

**Backend (`.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fundoo_notes
JWT_SECRET=your_secret_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

**Frontend (`client/.env`):**
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

### 5. Start Application

**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm start
```

Access the app at `http://localhost:3000`.

---

## 🧪 Testing

The project is covered by automated tests for both backend and frontend.

### Frontend Tests (Jest & React Testing Library)
Located in `client/src/**/*.test.js`. We verify component rendering, user interactions, and state updates.

**Run Frontend Tests:**
```bash
cd client
npm test
```
*Example: Label creation modal tests verify input handling and API calls.*

### Backend Tests (Mocha & Chai)
Located in `src/test/`. Covers API endpoints and service logic.

**Run Backend Tests:**
```bash
npm test
```

---

## 📜 Scripts

### Backend (`package.json`)
- `npm start`: Start production server
- `npm run dev`: Start development server (nodemon)
- `npm test`: Run backend tests
- `npm run lint`: Lint code

### Frontend (`client/package.json`)
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run frontend tests

---

## 👤 Author

**Arvind Pandey**

---

## 🔄 Version History

### v1.1.0 (Final)
- ✅ **Frontend Drag and Drop:** Integrated `@dnd-kit` for note organization.
- ✅ **Checklists:** Added support for to-do lists within notes.
- ✅ **Frontend Testing:** Added Jest/RTL unit tests for critical components.
- ✅ **Full UI Integration:** Completed Labels modal and Sidebar navigation.

### v1.0.0
- ✅ Full backend implementation (Node, Express, Mongo).
- ✅ Caching (Redis) & Queuing (RabbitMQ).
- ✅ Basic React structure.

**Last Updated:** January 7, 2026
**Status:** ✅ Completed & Production Ready
