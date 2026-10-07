# MeetFlow 🎥

MeetFlow is a real-time video meeting web application built using **React, Node.js, Express, MongoDB, Socket.IO, and WebRTC**.

It provides user authentication, meeting creation/joining, real-time communication, and video/audio meeting functionality.

---

## 🚀 Features

- User registration and login
- Authentication and protected routes
- Create and join video meetings
- Real-time communication using Socket.IO
- Video and audio communication using WebRTC
- Meeting history
- Responsive React interface
- MongoDB database integration
- REST API using Express.js
- Frontend and backend deployed separately on Render

---

## 🛠️ Technologies Used

### Frontend

- React 19
- Vite
- React Router
- Material UI
- Axios
- Socket.IO Client
- WebRTC
- JavaScript (ES6+)
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- bcrypt
- CORS
- dotenv

---

## 📁 Project Structure

```text
Meet_Flow/
│
├── backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── socketManager.js
│   │   │   └── User.js
│   │   │
│   │   ├── Models/
│   │   │   ├── User.js
│   │   │   └── meeting.js
│   │   │
│   │   ├── Routes/
│   │   │   └── userRoutes.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    └── Meetflow-frontend-main/
        ├── public/
        ├── src/
        │   ├── Context/
        │   │   └── AuthContext.jsx
        │   │
        │   ├── Pages/
        │   │   ├── About.jsx
        │   │   ├── Authentication.jsx
        │   │   ├── Enterprise.jsx
        │   │   ├── Features.jsx
        │   │   ├── history.jsx
        │   │   ├── home.jsx
        │   │   ├── HomePage.jsx
        │   │   ├── NotFound.jsx
        │   │   ├── Pricing.jsx
        │   │   └── videomeet.jsx
        │   │
        │   ├── Utils/
        │   │   └── withAuth.jsx
        │   │
        │   ├── assets/
        │   │
        │   ├── environment.js
        │   ├── App.jsx
        │   ├── App.css
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   └── main.jsx
        │
        ├── package.json
        └── vite.config.js
```

---

# ⚙️ Local Setup

## 1. Clone the project

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Meet_Flow
```

---

# 🔵 Backend Setup

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

### Create `.env`

Create:

```text
backend/.env
```

Add:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
```

Example:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/meetflow
PORT=8000
```

> Never commit your `.env` file to GitHub.

### Start the backend

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run at:

```text
http://localhost:8000
```

---

# 🟢 Frontend Setup

Open another terminal.

Navigate to the actual frontend project:

```bash
cd frontend/Meetflow-frontend-main
```

Install dependencies:

```bash
npm install
```

### Configure Backend URL

Open:

```text
src/environment.js
```

For local development:

```js
let IS_PROD = false;

const server = IS_PROD
    ? "https://meetflow-backend-issc.onrender.com"
    : "http://localhost:8000";

export default server;
```

For production:

```js
let IS_PROD = true;

const server = IS_PROD
    ? "https://meetflow-backend-issc.onrender.com"
    : "http://localhost:8000";

export default server;
```

### Start frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Local Application

When both servers are running:

```text
Frontend
http://localhost:5173
        │
        │ REST API / Socket.IO
        ▼
Backend
http://localhost:8000
        │
        ▼
MongoDB Atlas
```

---

# 🌐 Production Deployment

MeetFlow can be deployed using:

- **Frontend:** Render Static Site
- **Backend:** Render Web Service
- **Database:** MongoDB Atlas

## Backend on Render

Use:

```text
Build Command:
npm install
```

Start command:

```text
npm start
```

Add the following environment variables in Render:

```env
MONGO_URL=your_mongodb_connection_string
PORT=8000
```

---

## Frontend on Render

Build command:

```bash
npm install && npm run build
```

Publish directory:

```text
dist
```

Before deployment, make sure:

```js
let IS_PROD = true;
```

in:

```text
src/environment.js
```

The frontend will then use:

```text
https://meetflow-backend-issc.onrender.com
```

as the backend server.

---

# 🔐 Environment Variables

### Backend

```env
MONGO_URL=
PORT=8000
```

### Frontend

The current project uses `src/environment.js` instead of a frontend `.env` file.

Production:

```js
let IS_PROD = true;
```

Local:

```js
let IS_PROD = false;
```

---

# 📡 API

The backend API uses the following base route:

```text
/api/v1/users
```

The backend also uses Socket.IO for real-time meeting communication.

---

# 🎥 Video Meetings

MeetFlow uses:

### WebRTC

WebRTC handles:

- Camera
- Microphone
- Peer-to-peer media communication

### Socket.IO

Socket.IO handles real-time signaling and communication between connected users.

---

# 🧪 Development Commands

## Frontend

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Backend

Install:

```bash
npm install
```

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# 🐛 Common Problems

## `ENOENT: package.json not found`

Make sure you are inside:

```text
frontend/Meetflow-frontend-main
```

not:

```text
frontend
```

Correct:

```bash
cd frontend/Meetflow-frontend-main
npm install
```

---

## MongoDB connection error

Check:

```text
MONGO_URL
```

in:

```text
backend/.env
```

Also make sure your MongoDB Atlas network access allows your current IP address.

---

## Frontend cannot connect to backend

Check:

```text
src/environment.js
```

For local development:

```js
let IS_PROD = false;
```

For deployed frontend:

```js
let IS_PROD = true;
```

Also make sure the backend is running.

---

## Camera/Microphone not working

Allow camera and microphone permissions in the browser.

For deployed applications, use HTTPS because browser media permissions require a secure context.

---

# 🔒 Security

Do not upload these files to GitHub:

```text
.env
.env.local
node_modules/
```

Never expose your:

```text
MongoDB username
MongoDB password
API keys
JWT secrets
```

---

# 👩‍