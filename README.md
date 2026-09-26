# Student Management System

A full-stack Student Management System built with React, Node.js, Express, and MongoDB. The system allows authenticated users to view and search student records, while administrators can manage student data through complete CRUD operations.

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected application routes
- Logout functionality
- Forgot Password request flow

### Student Management
- Add new students
- View student records
- View individual student details
- Edit student information
- Delete student records
- Search students
- Paginated student listing

### Dashboard
- Total students
- Recent registrations
- Total departments
- Total courses
- Student registration overview
- Recent student registrations
- Dashboard search

### Role-Based Access

#### Administrator
Administrators have full access to student management features.

- View students
- Add students
- Edit students
- Delete students
- View dashboard statistics

#### Regular User
Regular users have view-only access.

- View students
- Search students
- View student details
- Access personal profile
- Access settings

Regular users cannot add, edit, or delete student records.

### User Interface
- Responsive design
- Mobile-friendly navigation
- Dashboard layout
- Responsive student table
- Student details page
- Profile page
- Settings page
- Orange and charcoal visual theme

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

### Development Tools
- VS Code
- Git
- GitHub
- MongoDB Atlas
- npm

## Project Structure

```text
StudentManager/
│
├── src/
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── AddStudent.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditStudent.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   ├── StudentDetails.jsx
│   │   └── Students.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── studentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── Student.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── createAdmin.js
│   ├── server.js
│   └── .env
│
├── public/
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
└── README.md
```
## Installation
1. Clone The repository
``` bash
git clone https://github.com/Khadijatulkubra23/Student-Management-System.git 
```
Navigate into the project
``` bash
cd Student-Management-System
```
2. Install frontend dependencies
``` bash 
npm install
```
3. Install backend dependencies
``` bash
cd server
npm install
```

## Environment Variables
Create a ```.env``` file inside the ```server``` folder.
``` bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Do not commit the ```.env``` file to GitHub.

## Running the Application
### Start the Backend
From the ```server``` folder
``` bash
npm run dev
```
The backend runs on:
``` bash
http://localhost:5000
```
### Start the Frontend
Open another terminal
``` bash
cd D:\Tasks\StudentManager
npm run dev
```
The frontend will run on the local Vite development URL shown in the terminal.
## Authentication and Authorization
The system uses JWT-based authentication.

When a user successfully logs in, the backend generates a JWT containing the user's identity and role.

The frontend stores the authentication information locally and uses it when communicating with protected API endpoints.

Role-based authorization is handled through middleware.

```
User
 │
 ├── Regular User
 │     └── View/Search Students
 │
 └── Administrator
       ├── View Students
       ├── Add Student
       ├── Edit Student
       └── Delete Student
```
## Database
The application uses MongoDB with Mongoose.
### User Collection
Stores
* Name
* Email
* Password
* Role
* Created/updated timestamps

### Student Collection
Stores
* Name
* Email
* Phone
* Gender
* Date of Birth
* Address
* Course
* Department
* Enrollment Date
* Created/updated timestamps

### Validation and Security
The application includes:

* Protected frontend routes
* Protected backend endpoints
* Role-based authorization
* Password hashing using bcrypt
* JWT authentication
* Required student fields
* MongoDB schema validation
* Environment variables for sensitive configuration

## Testing

The following functionality was tested during development:

* User registration
* User login
* Admin login
* Protected routes
* Admin permissions
* Regular user permissions
* Add student
* View student
* Edit student
* Delete student
* Student search
* Pagination
* Dashboard statistics
* Recent registrations
* Responsive layout
* Production build

The frontend production build was successfully tested using:
``` bash
npm run dev 
```