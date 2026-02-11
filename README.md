# 🚀 Agents & Tasks Manager

A full-stack web application designed to manage agents and distribute tasks efficiently using automated assignment logic. The system enables administrators to manage agents, upload task files, and monitor workflow, while agents can securely access only their assigned tasks through a role-based dashboard.

---

## 📌 Project Overview

Agents & Tasks Manager is built using the MERN stack and focuses on solving task allocation and monitoring problems in team-based environments. The application allows administrators to upload tasks in bulk through CSV or Excel files and automatically distributes them among active agents using a balanced distribution algorithm.  

The system ensures secure authentication, clean separation between admin and agent roles, and controlled access to data through protected APIs.

---

## ✨ Features

### 👨‍💼 Admin Features
- Admin login with role-based authentication
- Create and manage agents
- Activate or deactivate agents
- Create and manage additional admins (Super Admin protected)
- Upload CSV/XLSX files containing tasks
- Automatic equal task distribution
- Automatic task reassignment when an agent is deactivated
- View all agents and assigned tasks
- Delete individual tasks or all tasks
- Secure admin-only operations

### 👨‍💻 Agent Features
- Secure agent login
- Personal dashboard access
- View only assigned tasks
- View personal profile details
- Protected API access

---

## 🧩 Tech Stack

### 🖥 Frontend
- React.js
- CSS3 (Custom UI Styling)
- Axios
- React Router

### ⚙️ Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

### 🗄 Database
- MongoDB
- Mongoose ODM

---

## 📁 Project Structure

```
AgentsAndTask-Manager/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── server.js
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── layout/
│ ├── api/
│ └── App.jsx
│
└── README.md
```

---

## How To Run The Application

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Vivek-DK/AgentsAndTaskManagement.git
cd AgentsAndTaskManagement-master
```
## ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev
```

Server runs on:
http://localhost:5000


### 3️⃣ Frontend Setup
```bash
cd frontend/src
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## 🔐 How To Login

Default Super Admin Credentials

```
Email: admin@test.com
Password: admin123
```
Admin can:

Create agents

Upload tasks

Manage admins

Monitor task distribution

Agents can login using credentials created by admin and can access only their own dashboard.

---

## 🧠 Task Distribution Logic

Tasks are distributed using a **balanced round-robin algorithm**:

- Tasks divided equally among active agents
- Remaining tasks assigned sequentially
- When an agent is deactivated:
  - Remaining tasks automatically redistributed
  - Task history preserved

Example:

25 Tasks + 5 Agents
→ Each agent gets 5 tasks

---

## 🔐 Authentication & Security

- JWT-based authentication
- Role-based authorization
- Protected API routes
- Admin-only operations secured
- Agents cannot access other agents’ data
- Super Admin deletion restricted

---

## 📦 File Upload Format

* CSV / XLSX must contain headers:

* FirstName, Phone, Notes

Example:

John,9876543210,Follow up with customer
Mary,9876543211,Schedule product demo

--- 

## 🔌 API Overview (Short)
**Authentication**

POST /api/auth/login — Admin or Agent login

**Agents**

GET /api/agents — Get all active agents

POST /api/agents — Create agent (Admin only)

DELETE /api/agents/:id — Deactivate agent (Admin only)

**Tasks**

GET /api/tasks/my-tasks — Agent tasks

GET /api/upload/tasks — All tasks (Admin)

DELETE /api/tasks/:id — Delete single task

DELETE /api/tasks — Delete all tasks

**Upload**

POST /api/upload — Upload CSV/XLSX and distribute tasks

--- 

## 🎥 Demo Video
📺 Google Drive Link:
https://drive.google.com/file/d/1Vj7SL-jjCAc_QgIKhqjdwApAeIZMCTAk/view?usp=sharing

--- 

![image alt](https://github.com/Vivek-DK/AgentsAndTaskManagement/blob/97f9ac137931c32b835640079d9e2de66f37c9ca/project_images/landing_page.png)

![image alt](https://github.com/Vivek-DK/AgentsAndTaskManagement/blob/97f9ac137931c32b835640079d9e2de66f37c9ca/project_images/admin-dashboard.png)

![image alt](https://github.com/Vivek-DK/AgentsAndTaskManagement/blob/97f9ac137931c32b835640079d9e2de66f37c9ca/project_images/Agent-dashboard.png)

---

## 📌 Future Improvements


Notifications system


Task status tracking


Analytics dashboard


Agent performance metrics


Pagination for large datasets

--- 

## 👨‍💻 Author
* **Vivek DK** 
Full Stack Developer
React • Node.js • MongoDB

⭐ If you found this project useful, consider giving it a star.

---
