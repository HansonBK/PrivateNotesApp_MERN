# ✦ PrivateNotes — Full-Stack MERN App

A modern full-stack private messages / notes application built with the MERN stack.  
This project demonstrates authentication, protected routes, CRUD functionality, and clean UI design.

---

## ✨ Features

- User registration & login (JWT authentication)
- Protected routes (Dashboard, Create page)
- Create, edit, and delete private notes
- Clean, responsive UI with Tailwind
- Toast notifications for user feedback
- Organized project structure
- Full separation between frontend & backend

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

---

## 🚀 Getting Started

Clone the repository:
git clone https://github.com/HansonBK/PrivateNotesApp_MERN.git  
cd PrivateNotesApp_MERN  

Install all dependencies (frontend + backend):
npm run install:all  

Create a .env file inside the backend folder and add:
PORT= (example: 5000)
MONGO_URI=mongodb://127.0.0.1:27017/privatenotes  
JWT_SECRET=your_long_secret_here  
JWT_EXPIRES_IN= example: 1d

Run the project:
npm run dev  

The app will be available at:
Frontend → http://localhost:5173 
Backend → http://localhost:(PORT) 

---

## 🧪 Example User Flow

1. Register an account  
2. Login  
3. Access the dashboard (protected route)  
4. Create a note  
5. Edit or delete notes  
6. Logout  
7. Unauthorized users are blocked from protected pages  

---

## 🔮 Future Improvements

- Dark mode  
- Refresh tokens  
- User profile page  
- Unit & integration tests  
- Docker setup  

---

