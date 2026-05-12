import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, MessageSquare, Calendar, LogOut } from 'lucide-react';

const Sidebar = ({ role }: { role: 'student' | 'admin' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/student', icon: Home },
    { name: 'Complaints', path: '/student/complaints', icon: MessageSquare },
    { name: 'Leave Requests', path: '/student/leave', icon: Calendar },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Rooms', path: '/admin/rooms', icon: Home },
    { name: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
    { name: 'Leave Requests', path: '/admin/leave', icon: Calendar },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      <div className="p-6 text-xl font-bold border-b border-gray-800">
        Hostel MS
      </div>
      <nav className="flex-1 mt-6">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path.endsWith('/student') || link.path.endsWith('/admin')}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`
            }
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
