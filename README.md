# Zuri Helpdesk

A modern, scalable, multi-tenant Helpdesk & Customer Support platform built to help businesses manage customer conversations, support tickets, teams, and communication channels from a single dashboard.

---

## Features

### Customer Support
- Create and manage support tickets
- Real-time messaging
- Ticket assignment
- Ticket status management
- Priority levels
- Categories
- Internal notes
- Customer profiles
- Conversation history

### Organization Management
- Multi-tenant architecture
- Multiple organizations
- Branch management
- Department management
- Role-based access control
- Organization settings

### User Management
- Super Admin
- Organization Admin
- Consultants / Agents
- Customers
- Authentication & Authorization
- Secure password hashing
- JWT Authentication

### Real-time Communication
- WebSocket support
- Live chat
- Instant notifications
- Online/offline status
- Typing indicators
- Message delivery

### Dashboard
- Ticket statistics
- Customer insights
- Agent performance
- Recent activity
- Analytics

---

# Tech Stack

### Server

- Node.js
- Express.js
- MongoDB
- Mongoose
- WebSockets
- JWT
- bcrypt
- JavaScript

### Client

- React
- JavaScript
- Redux Toolkit
- Tailwind CSS
- React Router
- Axios
- React Icons

---

# Project Structure

```
zuri-helpdesk/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── App.tsx
│
└── README.md
```

---

# Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/zuri-helpdesk.git

cd zuri-helpdesk
```

---

## Backend

Install dependencies

```bash
cd backend

npm install
```

Run the server

```bash
npm run dev
```

---

## Frontend

Install dependencies

```bash
cd frontend

npm install
```
Start development server

```bash
npm run dev
```

---

# Authentication

Authentication uses JSON Web Tokens (JWT).

Protected routes require a valid access token.

Supported roles include:

- Super Admin
- Admin
- Consultant
- Customer

---

# User Roles

## Super Admin

- Manage organizations
- Create organization admins
- Manage system settings
- View analytics

---

## Organization Admin

- Manage branches
- Create consultants
- Manage users
- View organization reports
- Assign tickets

---

## Consultant

- Manage assigned tickets
- Reply to customers
- Internal notes
- Close tickets
- Update ticket status

---

## Customer

- Register/Login
- Create support tickets
- Chat with consultants
- View ticket history
- Receive updates

---

# API

Example

### Authentication

```
POST /api/auth/login

POST /api/auth/register

POST /api/auth/logout
```

### Organizations

```
GET    /api/organizations

POST   /api/organizations

PUT    /api/organizations/:id

DELETE /api/organizations/:id
```

### Users

```
GET /api/users

POST /api/users

PUT /api/users/:id

DELETE /api/users/:id
```

### Tickets

```
GET /api/tickets

POST /api/tickets

PATCH /api/tickets/:id

DELETE /api/tickets/:id
```

### Messages

```
GET /api/messages/:ticketId

POST /api/messages
```

---

# WebSocket Events

### Client

```
connection

join-room

leave-room

send-message

typing

stop-typing
```

### Server

```
message

new-ticket

ticket-updated

typing

online-users

notification
```

---

# Security

- Password hashing with bcrypt
- JWT Authentication
- Protected Routes
- CORS Configuration
- Environment Variables
- Request Validation
- Error Handling

---

# Future Features

- WhatsApp Integration
- Email Integration
- AI Chat Assistant
- Knowledge Base
- SLA Management
- Customer Satisfaction Ratings
- Reports & Analytics
- File Uploads
- Voice Notes
- Audit Logs
- Mobile Application

---

# Contributing

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push to your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# License

This project is licensed under the MIT License.

---

# Author

**Meshack Makumbane**

Full Stack Developer

- React
- Node.js
- Express
- MongoDB
- TypeScript
- WebSockets

---

## Support

If you found this project helpful, consider giving it a ⭐ on GitHub.