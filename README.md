# PassPort Redesign — Passport Application Experience

A clean, modern, and highly intuitive passport application platform that simplifies complex workflows and reduces user confusion.

## 🎯 Core Goal
Create a user-friendly passport application experience focusing on UX, security, and responsiveness.

## 🚀 Deployment Guide

### Backend (Render)
1.  Connect your GitHub repository to Render.
2.  Set the **Root Directory** to `backend`.
3.  Set the **Build Command** to `npm install`.
4.  Set the **Start Command** to `npm start`.
5.  Add the following **Environment Variables**:
    *   `MONGO_URI`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: A random secure string.
    *   `CLIENT_URL`: Your Netlify frontend URL.
    *   `NODE_ENV`: `production`.

### Frontend (Netlify)
1.  Connect your GitHub repository to Netlify.
2.  Set the **Base Directory** to `frontend`.
3.  Set the **Build Command** to `npm run build`.
4.  Set the **Publish Directory** to `dist`.
5.  Add the following **Environment Variable**:
    *   `VITE_API_URL`: Your Render backend API URL (e.g., `https://your-api.onrender.com/api`).

## 🛠 Tech Stack
-   **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons, AOS.
-   **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Axios.
, Bcrypt, Multer.
- **Design**: Primary Color: `#ACC8A2`, Secondary: `#1A2517`.

## 🔐 Security Features
- **JWT Auth**: Secure authentication with local storage/bearer tokens.
- **Password Hashing**: Bcrypt for secure storage.
- **Autosave**: Real-time draft saving to prevent data loss.
- **Input Validation**: Frontend and backend validation.

## 🚀 Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` (provided in project structure)
4. `npm start` (or `node server.js`)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Demo Credentials
- **Email**: `hire-me@anshumat.org`
- **Password**: `HireMe@2025!`

## 🎨 Design Decisions
- **Mobile-First**: Fully responsive layouts for all device breakpoints.
- **Glassmorphism**: Used subtle overlays for a premium feel.
- **Stepper UI**: Broken down long forms into 5 logical steps to reduce cognitive load.
- **Visual Feedback**: Real-time "Saving..." indicators and clear success screens.
