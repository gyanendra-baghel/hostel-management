import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ role }: { role: 'student' | 'admin' }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Sidebar role={role} />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
