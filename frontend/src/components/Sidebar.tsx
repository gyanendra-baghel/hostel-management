import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Home, MessageSquare, Calendar, LogOut, Sun, Moon, Building, Hotel } from 'lucide-react';

const Sidebar = ({ role }: { role: 'student' | 'admin' }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    { name: 'Rooms', path: '/admin/rooms', icon: Building },
    { name: 'Complaints', path: '/admin/complaints', icon: MessageSquare },
    { name: 'Leave Requests', path: '/admin/leave', icon: Calendar },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col fixed left-0 top-0 border-r border-white/5 shadow-2xl z-50">
      <div className="p-6 text-xl font-black border-b border-white/5 bg-linear-to-r text-white from-blue-500 to-cyan-400 bg-clip-text tracking-tighter flex items-center">
        <Hotel className='mr-3' />
        HOSTEL MS
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path.endsWith('/student') || link.path.endsWith('/admin')}
          >
            {({ isActive }) => (
              <div className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}>
                <link.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                  }`} />
                <span className="font-semibold text-sm">{link.name}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button
          onClick={toggleTheme}
          className="flex items-center w-full px-4 py-2.5 text-gray-400 hover:bg-white/5 rounded-xl transition-all duration-200 hover:text-white group text-sm font-medium"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-indigo-400 transition-colors" />
              Dark Mode
            </>
          ) : (
            <>
              <Sun className="w-5 h-5 mr-3 text-gray-500 group-hover:text-yellow-400 transition-colors" />
              Light Mode
            </>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2.5 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group text-sm font-semibold"
        >
          <LogOut className="w-5 h-5 mr-3 text-red-500 group-hover:scale-110 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
