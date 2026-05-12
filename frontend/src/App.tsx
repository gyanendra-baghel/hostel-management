import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/student/Dashboard';
import Complaints from './pages/student/Complaints';
import LeaveRequests from './pages/student/LeaveRequests';
import AdminDashboard from './pages/admin/Dashboard';
import Rooms from './pages/admin/Rooms';
import AdminComplaints from './pages/admin/Complaints';
import AdminLeaveRequests from './pages/admin/LeaveRequests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute role="student" />}>
              <Route element={<DashboardLayout role="student" />}>
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/complaints" element={<Complaints />} />
                <Route path="/student/leave" element={<LeaveRequests />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute role="admin" />}>
              <Route element={<DashboardLayout role="admin" />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/rooms" element={<Rooms />} />
                <Route path="/admin/complaints" element={<AdminComplaints />} />
                <Route path="/admin/leave" element={<AdminLeaveRequests />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
