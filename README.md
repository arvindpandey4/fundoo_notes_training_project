# FundooNotes Backend API

A feature-rich note-taking application backend built with Node.js, Express, MongoDB, Redis, and RabbitMQ.

## 🚀 Features

### Core Functionality
- ✅ User Authentication (Register, Login, Password Reset)
- ✅ Notes CRUD Operations
- ✅ Labels Management
- ✅ Archive, Trash, Pin Notes
- ✅ Search Notes (by title, description, label)
- ✅ Collaborator Sharing with Email Notifications

### Advanced Features
- ✅ **Redis Caching** - First 20 notes per user cached for performance
- ✅ **RabbitMQ Message Queue** - Async email notifications
- ✅ **Nodemailer** - Email service with Ethereal test SMTP
- ✅ **ESLint** - Code quality and linting
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Winston Logger** - Production-ready logging

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Cache:** Redis
- **Message Queue:** RabbitMQ
- **Email:** Nodemailer (Ethereal SMTP)
- **Authentication:** JWT
- **Logging:** Winston
- **Testing:** Mocha, Chai
- **Linting:** ESLint

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Docker (for Redis & RabbitMQ)

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Fundoo_App
```

2. **Install dependencies**
```bash
npm install
```

3. **Start Redis & RabbitMQ (Docker)**
```bash
docker run -d --name redis-stack -p 6379:6379 redis/redis-stack:latest
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

4. **Configure environment variables**

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fundoo
JWT_SECRET=your_jwt_secret_key_here
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
```

5. **Run the application**
```bash
# Development
npm run dev

# Production
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 📚 API Documentation

See **[TESTING.md](./TESTING.md)** for complete API endpoints with sample requests.

### Quick Start

**Register User:**
```bash
POST /api/v1/users/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Create Note:**
```bash
POST /api/v1/notes
Authorization: Bearer YOUR_TOKEN
{
  "title": "My First Note",
  "description": "Note description"
}
```

## 🎯 Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/users/register` | Register new user |
| POST | `/api/v1/users/login` | Login user |
| GET | `/api/v1/notes` | Get all notes (cached) |
| POST | `/api/v1/notes` | Create note |
| PATCH | `/api/v1/notes/:id/pin` | Pin/unpin note |
| PATCH | `/api/v1/notes/:id/archive` | Archive/unarchive note |
| PATCH | `/api/v1/notes/:id/trash` | Trash/restore note |
| GET | `/api/v1/notes/search?q=query` | Search notes |
| POST | `/api/v1/notes/:id/collaborator` | Add collaborator |
| POST | `/api/v1/labels` | Create label |
| GET | `/api/v1/notes/label/:labelId` | Get notes by label |

## 🔧 Architecture

```
src/
├── config/          # Database, Redis, RabbitMQ configs
├── controllers/     # Request handlers
├── middlewares/     # Auth, error handling
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Helpers (logger, token)
└── test/            # Test files
```

## 🧪 Testing

Run all tests:
```bash
npm test
```

Test specific features:
```bash
# Test labels
npm test -- --grep "Label"

# Test notes
npm test -- --grep "Note"
```

## 📊 Caching Strategy

- **Cache Key:** `notes:{userId}`
- **Cache TTL:** 1 hour (3600 seconds)
- **Cached Data:** First 20 notes per user
- **Invalidation:** Auto-invalidated on create/update/delete/archive/trash/pin

## 📧 Email Notifications

Emails are sent via RabbitMQ queue using Ethereal test SMTP:

1. Collaborator added → Email queued
2. RabbitMQ consumer processes queue
3. Nodemailer sends email
4. Preview URL logged in console

**View emails:** Copy preview URL from logs and open in browser.

## 🔍 Monitoring

**RabbitMQ Management UI:**  
http://localhost:15672 (guest/guest)

**Check Logs:**
```bash
# Redis cache
info: Cache hit for user: [userId]
info: Cache set for user: [userId]

# Email sent
info: Email sent: <message-id>
info: Preview URL: https://ethereal.email/message/xxxxx
```

## 🚦 Project Status

- ✅ User Authentication
- ✅ Notes CRUD
- ✅ Labels CRUD
- ✅ Archive/Trash/Pin
- ✅ Search Functionality
- ✅ Collaborators
- ✅ Redis Caching
- ✅ RabbitMQ Queue
- ✅ Email Notifications
- ✅ ESLint Setup
- ✅ Unit Tests

## 📝 Scripts

```json
{
  "start": "node src/index.js",
  "dev": "nodemon src/index.js",
  "test": "mocha src/test/**/*.test.js --timeout 10000 --exit",
  "lint": "eslint src/**/*.js",
  "lint:fix": "eslint src/**/*.js --fix"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC

## 👤 Author

Arvind Pandey

---

**For detailed API testing, see [TESTING.md](./TESTING.md)**
