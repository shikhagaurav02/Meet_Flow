# MeetFlow 🎥

MeetFlow is a modern, real-time video conferencing web application built with **React, Node.js, Express, MongoDB, Socket.IO, and WebRTC**.

It provides complete user authentication, instant meeting creation, room sharing, real-time messaging, WebRTC audio/video calling, and meeting history tracking.

---

## 🚀 Features

- **Instant & Scheduled Meetings:** Create a new instant meeting or join with a custom meeting room code.
- **Copy & Share Meeting Links:** One-click copy link in the active meeting room.
- **User Authentication:** Registration and login with password hashing and persistent token sessions.
- **WebRTC Audio & Video:** Peer-to-peer video streaming with camera and microphone controls.
- **Screen Sharing:** Integrated browser display media sharing.
- **In-Call Real-Time Chat:** Persistent in-room chat powered by Socket.IO.
- **Meeting History:** View previous meetings and rejoin at any time.
- **Responsive Modern UI:** Built with Material UI and Bootstrap 5 with dedicated desktop and mobile support.
- **Health Checks & Production Ready:** `/health` endpoint for monitoring and Render uptime checks.
- **1-Click Render Deployment:** Includes `render.yaml` Blueprint configuration for zero-friction deployment.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Vite**
- **React Router 7**
- **Material UI & Material Icons**
- **Socket.IO Client**
- **WebRTC API**
- **Axios**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Socket.IO**
- **Bcrypt**
- **CORS**
- **Dotenv**

---

## 📁 Clean Project Structure

```text
Meet_Flow/
│
├── backend/
│   ├── src/
│   │   ├── Controller/
│   │   │   ├── socketManager.js   # Socket.IO & WebRTC signaling
│   │   │   └── User.js            # Auth & Meeting history controllers
│   │   ├── Models/
│   │   │   ├── meeting.js         # Meeting history schema
│   │   │   └── User.js            # User accounts schema
│   │   ├── Routes/
│   │   │   └── userRoutes.js      # REST API route handlers
│   │   └── app.js                 # Server entry point & health checks
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   └── logo3.png
│   ├── src/
│   │   ├── assets/
│   │   ├── Context/
│   │   │   └── AuthContext.jsx    # Auth state & session management
│   │   ├── Pages/
│   │   │   ├── About.jsx
│   │   │   ├── Authentication.jsx
│   │   │   ├── Enterprise.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── history.jsx        # User meeting history & quick rejoin
│   │   │   ├── home.jsx           # Dashboard with New Meeting & Join Code
│   │   │   ├── HomePage.jsx       # Landing page
│   │   │   ├── NotFound.jsx       # Custom 404 page
│   │   │   ├── Pricing.jsx
│   │   │   └── videomeet.jsx      # Video conferencing, chat, screen share
│   │   ├── styles/
│   │   ├── Utils/
│   │   ├── App.css
│   │   ├── App.jsx                # Layout & conditional Navbar/Footer
│   │   ├── environment.js         # Dynamic backend URL resolver
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── render.yaml                    # Render Blueprint deployment config
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/shikhagaurav02/Meet_Flow.git
cd Meet_Flow
```

### 2. Configure & Run Backend

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/meetflow?retryWrites=true&w=majority
PORT=8000
```

Start the backend:
```bash
# Development mode:
npm run dev

# Or standard production mode:
npm start
```
The backend will run on `http://localhost:8000`. You can verify it at `http://localhost:8000/health`.

### 3. Configure & Run Frontend

Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`. In development, it automatically connects to `http://localhost:8000`.

---

## 🌐 Deploying on Render

You can deploy MeetFlow on [Render](https://render.com) using either **Method 1 (Render Blueprint - Recommended)** or **Method 2 (Manual Setup)**.

### Prerequisites: MongoDB Atlas Database

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a Database User with read and write permissions.
3. Under **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere) so Render servers can connect to your database.
4. Copy your connection string:
   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/meetflow?retryWrites=true&w=majority
   ```

---

### Method 1: Deploy with Render Blueprint (`render.yaml`) (Recommended)

1. Push your repository to GitHub.
2. In your [Render Dashboard](https://dashboard.render.com), click **New +** -> **Blueprint**.
3. Connect your `Meet_Flow` repository.
4. Render will automatically detect `render.yaml` and configure both services:
   - **`meetflow-backend`** (Web Service)
   - **`meetflow-frontend`** (Static Site)
5. Enter your `MONGO_URL` when prompted for the backend environment variable.
6. Click **Apply**. Both the backend and frontend will build and deploy!
7. Once deployed, copy your backend URL (e.g. `https://meetflow-backend.onrender.com`) and add `VITE_BACKEND_URL` to the frontend Static Site environment variables if you want to explicitly override it.

---

### Method 2: Manual Dashboard Setup

#### Step 1: Deploy Backend (Web Service)

1. On Render, click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Name:** `meetflow-backend`
   - **Language:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/health`
4. Add Environment Variables:
   - `PORT`: `8000`
   - `MONGO_URL`: `your_mongodb_atlas_connection_string`
5. Click **Create Web Service**.
6. Note down your backend URL (e.g. `https://meetflow-backend-xxxx.onrender.com`).

#### Step 2: Deploy Frontend (Static Site)

1. On Render, click **New +** -> **Static Site**.
2. Connect the same GitHub repository.
3. Configure settings:
   - **Name:** `meetflow-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. In **Redirects/Rewrites**:
   - Add a rewrite rule:
     - **Type:** `Rewrite`
     - **Source:** `/*`
     - **Destination:** `/index.html`
   *(This ensures client-side routing like `/:url`, `/home`, and `/history` work without 404 errors on page refresh)*
5. In **Environment Variables**:
   - `VITE_BACKEND_URL`: `https://meetflow-backend-xxxx.onrender.com` (Your deployed backend URL from Step 1)
6. Click **Create Static Site**.

---

## 🔒 Important Notes for Production

- **HTTPS Required for Media Permissions:** Modern browsers require HTTPS (secure context) to grant camera and microphone access. Render automatically provisions free SSL/TLS certificates for all deployed services.
- **WebRTC Signaling:** Socket.IO handles signaling to negotiate peer connections. STUN servers (`stun:stun.l.google.com:19302`) are configured for NAT traversal.
- **MongoDB IP Whitelist:** Ensure MongoDB Atlas Network Access includes `0.0.0.0/0` to allow inbound connections from Render.

---

## 📜 License

This project is licensed under the ISC License.