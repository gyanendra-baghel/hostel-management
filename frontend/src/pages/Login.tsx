import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import { Hotel, Moon, Sun, Shield, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/student');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleTestLogin = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <Hotel className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">HOSTEL MS</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-black mb-6 text-center text-gray-800 dark:text-gray-100">Welcome Back</h2>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4 border border-red-100 dark:border-red-900/30 text-center font-medium">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-400 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 active:scale-95 mt-2">
              Sign In
            </button>
          </form>

          {/* Test Accounts Section */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest text-center mb-4">Test Accounts</p>
            <div className="space-y-3">
              <button 
                onClick={() => handleTestLogin('gyanendrabaghel633@gmail.com', 'Gyanendra12@')}
                className="w-full flex items-center p-3 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition text-left group"
              >
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mr-3">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-300">Admin Account</p>
                  <p className="text-[10px] text-blue-600/70 dark:text-blue-400/70 truncate">gyanendrabaghel633@gmail.com</p>
                </div>
              </button>
              
              <button 
                onClick={() => handleTestLogin('9426gsingh@gmail.com', 'Gyanendra12@')}
                className="w-full flex items-center p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 mr-3">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300">Student Account</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 truncate">9426gsingh@gmail.com</p>
                </div>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm font-medium">
            Don't have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Register now</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Hotel className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-black tracking-tighter text-gray-900 dark:text-white uppercase">Hostel MS</span>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            Streamlining Hostel Operations &copy; 2026
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
