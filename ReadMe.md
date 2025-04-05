# 📚 Book Management App

A full stack application that allows users to manage their personal book collection. Built with React, Vite, TypeScript, Express, and MongoDB, the app enables users to securely add, edit, delete, and view books in their library with authentication.

---

## ✨ Features

- User authentication (via provided backend codebase)
- Add, edit, and delete books
- Remove and add books to collection
- View a list of all books added to user's collection
- Responsive, modern UI built with React + Vite + TypeScript
- API built with Express and TypeScript
- MongoDB for persistent data storage

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: Pre-built backend auth system
- **Tooling**: ts-node, nodemon, dotenv, mongoose

---

## 📁 Project Structure

bookvault/
├── backend/ # Express API and auth integration
│ ├── src/ │
| ├── package.json
│ └── tsconfig.json
├── frontend/ # React + Vite frontend
│ ├── src/
│ ├── package.json
│ └── vite.config.ts
└── README.md # You're here!

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- Node.js (v16+)
- npm
- MongoDB (local or remote instance)
- Git

---

### 1. Clone the Repository

git clone: https://github.com/tealsjareynolds/bookvaule.git
cd book-management-app 2. Install Dependencies
Backend-
cd backend
npm install

Frontend-
cd ../frontend
npm install

3. Environment Variables
   In the backend/ folder, create a .env file with the following content:
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/bookvault
   JWT_SECRET=your_jwt_secret

Replace your_jwt_secret with a secure secret key for JWT.

4. Use this link to download the default JSON books that are set up to appear correctly throughout this project. Import them into mongodb and make sure the database is connected: https://github.com/telasjareynolds/book-file/blob/main/bookvault.books.json

-- For reference, this file originally came from "https://github.com/benoitvallon/100-best-books/blob/master/books.json" but I've converted the value of id into strings for the project.

5. Run the Application

Start the backend server-
cd backend
npm run dev

Start the frontend-
cd ../frontend
npm run dev

Frontend: http://localhost:3000

Backend: http://localhost:3001

🔐 Authentication
This project uses a provided backend authentication system. Once logged in:

- Store the JWT token in localStorage or sessionStorage

- Send the token in requests to protected routes using the Authorization header:

Authorization: Bearer <your_token>

✅ Functionality Checklist

- User can register and log in
- User can add a new book
- User can edit a book’s details
- User can delete a book
- User can view all saved books
- Proper backend authentication integration
- Responsive and accessible UI

📬 Contact
Built with ❤️ by Telasja Reynolds
GitHub: https://github.com/telasjareynolds
Email: telasjareynolds@gmail.com
