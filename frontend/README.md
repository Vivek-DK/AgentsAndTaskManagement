# 🚀 Agents & Tasks Manager

A full-stack web application to manage agents and distribute tasks efficiently using automated assignment logic.  
The system allows admins to manage agents, upload tasks via CSV/XLSX files, and monitor task distribution while agents can securely access only their assigned work.

---

## 🌐 Live Overview

✅ Role-based authentication (Admin / Agent)  
✅ Automatic task distribution  
✅ CSV / XLSX upload support  
✅ Agent activation & deactivation  
✅ Secure JWT authentication  
✅ Modern dashboard UI with animations  
✅ Production-ready backend structure

---

## 🧩 Tech Stack

### 🖥 Frontend
- ⚛️ React.js
- 🎨 CSS3 (Custom UI)
- 🔗 Axios
- 🧭 React Router

### ⚙️ Backend
- 🟢 Node.js
- 🚂 Express.js
- 🔐 JWT Authentication
- 🔑 bcrypt.js

### 🗄 Database
- 🍃 MongoDB
- Mongoose ODM

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

## ✨ Features

### 👨‍💼 Admin Features
- Create / deactivate agents
- Create and manage admins (Super Admin protected)
- Upload CSV / XLSX task files
- Automatic equal task distribution
- Reassign tasks when agent is deactivated
- View all agents and tasks
- Delete single or all tasks
- Role-based access control

### 👨‍💻 Agent Features
- Secure login
- View personal dashboard
- Access only assigned tasks
- View personal details
- Protected API access

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

## 👑 Default Super Admin

Use seeded admin credentials:

Email: admin@test.com
Password: admin123

--- 

## 📦 File Upload Format

* CSV / XLSX must contain headers:

* FirstName, Phone, Notes

Example:

John,9876543210,Follow up with customer
Mary,9876543211,Schedule product demo

--- 

## 🎥 Demo Video
📺 Google Drive Link:
[Add your demo video link here]

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
