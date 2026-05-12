# Hostel Management System

A full-stack web application designed to manage hostel operations including student management, room allocation, complaints, and leave requests.

## Objective

Build a comprehensive digital platform for hostel administrators and students to streamline communication and management.

## Tech Stack

- **Frontend:** React.js (v19), Tailwind CSS (v4), Lucide React, Axios, React Router (v7)
- **Backend:** Node.js, Express.js (v5), MongoDB (Mongoose), JWT Authentication
- **Tools:** Vite, Git, npm

## Features

### 1. Authentication System

- **Student & Admin Roles:** Distinct login/register paths for students and administrators.
- **JWT-Based Security:** Secure authentication using JSON Web Tokens.
- **Protected Routes:** Role-based access control ensuring users only see what they are authorized for.

### 2. Student Dashboard

- **Profile Overview:** View personal details and account information.
- **Room Details:** Real-time view of assigned room number, status, and assignment date.
- **Complaint System:**
  - Raise complaints (Electricity, Water, Cleaning, Internet, Other).
  - Track complaint status (Pending/Resolved).
- **Leave Request System:**
  - Apply for leave with reasons and specific dates.
  - Track approval status.

### 3. Room Management (Admin)

- **CRUD Operations:** Add new rooms with specific capacities.
- **Assignment System:** Assign students to rooms via email.
- **Occupancy Tracking:** Monitor vacant, partially filled, and fully occupied rooms.
- **Access Revocation:** Unassign students from rooms with ease.

### 4. Complaint Management (Admin)

- **Overview:** View all student complaints in a centralized dashboard.
- **Status Updates:** Mark complaints as resolved once addressed.
- **Search:** Search complaints by student name, email, or description.

### 5. Leave Request System (Admin)

- **Processing:** Approve or reject student leave applications.
- **Audit Trail:** View history of leave requests with dates and reasons.

### 6. Admin Dashboard

- **Quick Stats:** Visual summary of Total Students, Total Rooms, Occupied Rooms, Pending Complaints, and Pending Leaves.

### Core Features Included

- **Responsive Design:** Fully mobile-friendly UI using Tailwind CSS.
- **Dark Mode:** Built-in theme switching for better user experience.
- **Search & Pagination:** Efficient data handling for rooms, complaints, and leave requests.

## Project Structure

```
hotel-management/
├── backend/          # Express API server
│   ├── src/
│   │   ├── config/   # DB and Env config
│   │   ├── controllers/
│   │   ├── models/   # Mongoose schemas
│   │   ├── routes/
│   │   └── index.js
├── frontend/         # React application
│   ├── src/
│   │   ├── api/      # Axios instance
│   │   ├── components/
│   │   ├── context/  # Auth and Theme providers
│   │   ├── pages/    # Student and Admin views
│   │   └── App.tsx
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB (Local or Atlas)

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example` for reference):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ORIGIN=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example` for reference):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Live Demo

Available at: [https://hostel-management-frontend.vercel.app/](https://hostel-management-frontend.vercel.app/)

For quick evaluation, use the following accounts:

| Role        | Email                          | Password       |
| :---------- | :----------------------------- | :------------- |
| **Admin**   | `gyanendrabaghel633@gmail.com` | `Gyanendra12@` |
| **Student** | `9426gsingh@gmail.com`         | `Gyanendra12@` |

## Implementation Status

### Completed

- [x] Full Authentication System (JWT + Role-based)
- [x] Student & Admin Dashboards
- [x] Room CRUD and Allocation
- [x] Complaint Management
- [x] Leave Request Processing
- [x] Dark Mode Support
- [x] Responsive UI
- [x] Search & Pagination

### Pending / Future Enhancements

- [ ] **Profile Photo Upload:** Integration with Cloudinary for student profiles.
- [ ] **Notifications:** Real-time updates for complaint resolution or leave approval.
- [ ] **PDF Reports:** Generate room occupancy or complaint reports in PDF format.
