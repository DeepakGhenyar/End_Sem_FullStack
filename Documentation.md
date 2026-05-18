# ESE EXAMINATION AI (BLENDED) - AI308B
## Project Report: AI-Based Employee Performance Analytics & Recommendation System

**Submitted by:** [Your Name / Roll No]  
**Date:** [Submission Date]

---

## 1. Project Overview & URLs
This is a full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations.

- **Live Frontend URL (Render):** [Insert Frontend URL Here]
- **Backend API URL (Render):** [Insert Backend URL Here]
- **GitHub Repository Link:** [Insert GitHub Repo Link Here]

---

## 2. Screenshots: Running the Application

### 2.1 Code Editor (Folder Structure)
[INSERT SCREENSHOT: VS Code showing the frontend and backend folders, package.json, server.js, etc.]

### 2.2 MongoDB Items Storage
[INSERT SCREENSHOT: MongoDB Atlas or Compass showing the 'employees' and 'users' collections with data]

### 2.3 Frontend Application (React UI)
1. **Employee Registration Form (Add Employee):**
   [INSERT SCREENSHOT: React Add Employee Page]
2. **Employee List Page with Search & Filter:**
   [INSERT SCREENSHOT: React Dashboard with list of employees]
3. **AI Recommendation Display Page:**
   [INSERT SCREENSHOT: React Page showing AI insights for an employee]

### 2.4 Render Deployment Success
[INSERT SCREENSHOT: Render Dashboard showing both Web Service and Static Site as "Live/Deployed"]

### 2.5 API Testing (Postman / Thunder Client)

**1. POST /api/employees (Add Employee)**
[INSERT SCREENSHOT: Postman POST request with body and 201 response]

**2. GET /api/employees (Get All Employees)**
[INSERT SCREENSHOT: Postman GET request returning array of employees]

**3. GET /api/employees/search?department=Development (Search Employee)**
[INSERT SCREENSHOT: Postman GET request with query param filtering by department]

**4. POST /api/ai/recommend (AI Recommendation API)**
[INSERT SCREENSHOT: Postman POST request to AI endpoint returning text recommendation]

**5. POST /api/auth/login (JWT Generation)**
[INSERT SCREENSHOT: Postman POST request to login returning the JWT Token]

---

## 3. Code Snippets & Implementation Details

### 3.1 Backend: Controller & Route Structure (Express.js)
**`backend/controllers/employeeController.js` (Add Employee)**
```javascript
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;
        if (performanceScore === undefined || performanceScore === null) {
            return res.status(400).json({ message: 'Validation error: performanceScore is required' });
        }
        let existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Error message: Employee with this email already exists' }); 
        }
        const employee = new Employee({ name, email, department, skills, performanceScore, experience });
        await employee.save();
        res.status(201).json({ message: 'Employee stored successfully', employee });
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
};
```

### 3.2 AI Integration (OpenRouter / OpenAI)
**`backend/controllers/aiController.js`**
```javascript
// Validates if employee has high score for promotion or needs training
if (!process.env.OPENROUTER_API_KEY) {
    if (emp.performanceScore >= 80) mockRec = "Promotion suggestion: Highly recommended for promotion based on high performance score.";
    else if (emp.performanceScore < 60) mockRec = "Improvement feedback: Needs to improve core competencies.";
    if (!emp.skills || emp.skills.length === 0) mockRec += " | Skill enhancement recommendation: Needs training in basic department skills.";
}
```

### 3.3 Database Implementation (MongoDB Schema)
**`backend/models/Employee.js`**
```javascript
const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    skills: { type: [String], required: true },
    performanceScore: { type: Number, required: true, min: 0, max: 100 },
    experience: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Employee', employeeSchema);
```

### 3.4 Authentication & Security (JWT & bcrypt)
**`backend/middleware/authMiddleware.js`**
```javascript
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
module.exports = authMiddleware;
```

---
*End of Report*
