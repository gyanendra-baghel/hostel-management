import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, Home, AlertCircle, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const statCards = [
    { name: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Rooms', value: stats.totalRooms, icon: Home, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Occupied Rooms', value: stats.occupiedRooms, icon: Home, color: 'text-red-600', bg: 'bg-red-100' },
    { name: 'Pending Complaints', value: stats.pendingComplaints, icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { name: 'Leave Requests', value: stats.pendingLeaves, icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className={`p-4 rounded-full ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
