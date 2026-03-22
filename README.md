# PassPort Redesign — Passport Application Experience

A clean, modern, and highly intuitive passport application platform that simplifies complex workflows and reduces user confusion.

## 🎯 Core Goal
Create a user-friendly passport application experience focusing on UX, security, and responsiveness.

## ✨ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, AOS (Animations), Framer Motion.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt, Multer.
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
