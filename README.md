#  User Access Management System

This is a full-stack application for managing user access to software systems. It allows:

- Employees to register, log in, and request software access
- Managers to approve or reject access requests
- Admins to create new software 

---

## 🚀 Tech Stack

**Frontend:**
- React.js
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- TypeORM
- PostgreSQL
- JWT Authentication
- Bcrypt

**Tools:**
- dotenv
- nodemon

##  Features

### Authentication
- JWT-based login
- Role-based redirection (Employee / Manager / Admin)

###  Admin
- Create new software with access levels

###  Employee
- Request access to software
- View request status

###  Manager
- View all pending requests
- Approve or reject access requests

---

##  Setup Instructions

### 1. Clone the repository

 - cd backend
 - npm install

### .env file
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME= your username     -postgres
DB_PASSWORD=your-db-password
DB_NAME=your db name
JWT_SECRET=assignment121 ---- secret key

###  run command 
 - npx nodemon

### Setup Frontend
 - cd user-access-frontend
 - npm install
 - npm run dev


## API Endpoints

 - POST - /api/auth/signup - Register a new user
 - POST - /api/auth/login - 	Login and return JWT

 - POST -  /api/software - Add new software

- POST - /api/requests - Request access to software
- GET  - /api/requests/pending - View all pending requests
- PATCH - /api/requests/:id - Approve or reject a request

### API Postman Data
  - Signup
     - {
  "username": "john_doe",
  "password": "password123",
  "role": "Employee"  // Admin  // Manager
}

- Login
  - {
  "username": "john_doe",
  "password": "password123"
} 

- Create Software (Admin only)
   - Authorization: Bearer JWT TOKEN
   - {
  "name": "Visual Studio",
  "description": "Code editing software",
  "accessLevels": ["Read", "Write", "Admin"]
}

- Requests Access (Employee Only)
 - Authorization: Bearer JWT TOKEN
   - {
  "softwareId": 1,
  "accessType": "Write",
  "reason": "Need write access to edit code"
}

- View Panding Requests (Manager only)
   - Authorization: Bearer JWT TOKEN
       - {
  "status": "Approved"
}
OR
     - {
  "status": "Rejected"
}

### Contact
Email: sourabhundale@gmail.com

