Task Manager (MERN Stack)
A modern, dark-themed task management application built using the MERN stack. Helps users manage tasks efficiently with clean UI, token-based authentication, and smooth workflows.

 
Table of Contents
•	- Features
•	- Tools and Technologies
•	- Dependencies
•	- Dev-dependencies
•	- Prerequisites
•	- Installation and Setup
•	- Backend API
•	- Frontend Pages
•	- npm Scripts
•	- Useful Links
•	- Contact

Features
•	- Signup, Login, Logout
•	- Add, View, Update, Delete tasks
•	- Toasts for success and error messages
•	- Form validations in frontend and backend
•	- Fully Responsive Navbar
•	- Token-based Authentication
•	- 404 error handling
•	- Global user state using Redux
•	- Custom Loaders
•	- Theme styling with Tailwind CSS
•	- Reusable components and routes protection
•	- Dynamic document titles
•	- Redirect to intended page after login
•	- Custom hook (useFetch)
•	- Middleware verification in backend

Tools and Technologies
•	- React
•	- Node.js
•	- Express.js
•	- MongoDB
•	- Redux
•	- Tailwind CSS
•	- JWT

Dependencies
•	- axios
•	- react
•	- react-dom
•	- react-redux
•	- react-router-dom
•	- react-toastify
•	- redux
•	- redux-thunk
•	- bcrypt
•	- cors
•	- dotenv
•	- express
•	- jsonwebtoken
•	- mongoose

Dev-dependencies
•	- nodemon
•	- concurrently (optional)

Prerequisites
•	- Node.js installed
•	- MongoDB instance running
•	- VS Code (preferred editor)

Installation and Setup
•	- 1. Clone & install dependencies: npm run install-all
•	- 2. Create a .env file in /backend and add your MongoDB URL and token secret
•	- 3. Start the project: npm run dev
•	- 4. Visit http://localhost:3000

Backend API
•	- POST /api/auth/signup
•	- POST /api/auth/login
•	- GET /api/tasks
•	- GET /api/tasks/:taskId
•	- POST /api/tasks
•	- PUT /api/tasks/:taskId
•	- DELETE /api/tasks/:taskId
•	- GET /api/profile

Frontend Pages
•	- / - Public home / dashboard
•	- /signup - User signup
•	- /login - User login
•	- /tasks/add - Add new task
•	- /tasks/:taskId - Edit task

npm Scripts
•	- Root: npm run dev, npm run dev-server, npm run dev-client, npm run install-all
•	- Frontend: npm start, npm run build
•	- Backend: npm run dev, npm start

Useful Links
•	- React Docs: https://reactjs.org/docs/
•	- MongoDB Docs: https://docs.mongodb.com/
•	- Node.js: https://nodejs.org/
•	- Tailwind CSS: https://tailwindcss.com/

Contact
•	- Name: 
•	Adi Baswaraj Patil(Author)
•	Srivar
•	Sridhar
