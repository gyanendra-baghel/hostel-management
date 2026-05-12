# Hostel Management System

A full-stack web application to manage hostel students, rooms, complaints, and leave requests digitally.

## Features

### Authentication
- JWT-based authentication
- Role-based access control (Student and Admin)
- Secure registration and login

### Student Dashboard
- View profile and room details
- Submit and track complaints (Electricity, Water, Cleaning, Internet)
- Apply for leave and track status

### Admin Dashboard
- Statistics (Total students, rooms, pending complaints, etc.)
- Room management (Create rooms, update status)
- Complaint management (View all, mark as resolved)
- Leave request management (Approve or Reject)

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide React, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JSON Web Token (JWT)

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or via Atlas)

### Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies: `npm install`
3. Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hostel-management
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server: `node index.js`

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Screenshots
(Add screenshots here after running the app)
