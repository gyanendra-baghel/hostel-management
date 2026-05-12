import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hotel, 
  ShieldCheck, 
  Users, 
  Building, 
  MessageSquare, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      title: 'Room Management',
      description: 'Easily manage room allocations, track occupancy, and monitor room status in real-time.',
      icon: Building,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Complaint Portal',
      description: 'Digital platform for students to raise issues and admins to resolve them efficiently.',
      icon: MessageSquare,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'Leave System',
      description: 'Streamlined process for leave applications and approvals with full history tracking.',
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      title: 'Role-based Access',
      description: 'Secure, dedicated dashboards for both students and hostel administrators.',
      icon: ShieldCheck,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Hotel className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white">HOSTEL MS</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">Features</a>
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition">About</a>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <Link to="/login" className="text-gray-900 dark:text-white font-semibold">Login</Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
               <button onClick={toggleTheme} className="p-2">
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <Link to="/login" className="text-sm font-bold text-blue-600">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 border border-blue-100 dark:border-blue-900/30">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            The Future of Hostel Management
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            Manage Your Hostel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Efficiently & Digitally</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive platform for students and administrators to handle room allocations, 
            complaints, and leave requests seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition flex items-center justify-center shadow-xl shadow-blue-600/30 group"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center"
            >
              Administrator Login
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full max-w-4xl mx-auto"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-2 overflow-hidden max-w-5xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-32 bg-blue-500/10 rounded-xl border border-blue-500/20"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
                <div className="col-span-2 space-y-4">
                   <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="h-24 bg-green-500/10 rounded-xl border border-green-500/20"></div>
                     <div className="h-24 bg-purple-500/10 rounded-xl border border-purple-500/20"></div>
                   </div>
                   <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">Everything you need</h2>
            <p className="text-gray-600 dark:text-gray-400">Streamlining hostel operations with powerful digital tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition group"
              >
                <div className={`${feature.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-600 mb-2">120+</div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Rooms Managed</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-600 mb-2">100%</div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Digital Workflow</div>
            </div>
            <div>
              <div className="text-4xl font-black text-orange-600 mb-2">24/7</div>
              <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">Support Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Hotel className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white">HOSTEL MS</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Made with ❤️ for modern hostels. All rights reserved &copy; 2026.
          </p>
          <div className="flex justify-center space-x-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
