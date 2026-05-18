# AI-Based Employee Performance Analytics System

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue?style=flat-square&logo=react)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange?style=flat-square)

This project is a Full-Stack MERN (MongoDB, Express, React, Node.js) application built for the **AI Driven Full Stack Development** End-Semester Examination. The system analyzes employee performance data and provides AI-powered recommendations (like promotions, training suggestions) using an external AI API (OpenRouter/Llama 3).

## Features
- **User Authentication**: Secure HR/Admin login and signup using JWT and bcrypt password hashing.
- **Employee Management**: Add, view, delete, and manage employee records.
- **Search & Filter**: Search employees dynamically by department.
- **AI Recommendations**: Get AI-generated promotion suggestions, training feedback, and overall rankings based on employee performance scores, skills, and experience.
- **Responsive UI**: Built with React and Vanilla CSS for a beautiful, responsive user experience.

## Tech Stack
- **Frontend**: React.js, Vite, Axios, React Router, Lucide Icons.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ORM).
- **AI Integration**: OpenRouter API (`meta-llama/llama-3-8b-instruct:free`).

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas cluster connection string.
- OpenRouter API Key.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DeepakGhenyar/End_Sem_FullStack.git
   cd End_Sem_FullStack
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```
   Start the backend server:
   ```bash
   node server.js
   ```

3. **Frontend Setup**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

## Deployment
This project is configured to be deployed on **Render** using the provided `render.yaml` Blueprint file, which automatically sets up a Node.js Web Service for the backend and a Static Site for the React frontend.

## License
Developed for ESE AI Full Stack Examination.
