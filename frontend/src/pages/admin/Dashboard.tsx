import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { 
  Users, 
  Home, 
  AlertCircle, 
  Calendar, 
  UserPlus, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  MessageSquare
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend
} from 'recharts';

const AdminDashboard = () => {
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

  if (!stats) return <div className="dark:text-gray-400 text-center py-10 font-medium italic">Loading dashboard metrics...</div>;

  const statCards = [
    { name: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { name: 'Unassigned', value: stats.unassignedStudents, icon: UserPlus, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { name: 'Occupied Rooms', value: stats.occupiedRooms, icon: Home, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
    { name: 'Pending Complaints', value: stats.pendingComplaints, icon: AlertCircle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { name: 'Leave Requests', value: stats.pendingLeaves, icon: Calendar, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { name: 'Resolved', value: stats.resolvedComplaints, icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
  ];

  const pieData = [
    { name: 'Vacant', value: stats.roomStatus.vacant, color: '#10b981' },
    { name: 'Partial', value: stats.roomStatus.partial, color: '#f59e0b' },
    { name: 'Full', value: stats.roomStatus.occupied, color: '#ef4444' },
  ];

  const barData = stats.complaintTypes.map((item: any) => ({
    name: item._id,
    count: item.count
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100">System Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to the hostel management control center.</p>
      </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-md transition">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} w-fit mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room Status Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Room Occupancy Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Complaint Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Complaints */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Complaints
            </h3>
            <Link to="/admin/complaints" className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {stats.recentComplaints.length > 0 ? (
              stats.recentComplaints.map((c: any) => (
                <div key={c._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">{c.user.name}</span>
                    <span className="text-xs text-gray-400 font-medium">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.description}</p>
                  <div className="mt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                      {c.type}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400 italic text-sm">No pending complaints.</div>
            )}
          </div>
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-500" />
              Recent Leave Requests
            </h3>
            <Link to="/admin/leave" className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y dark:divide-gray-700">
            {stats.recentLeaves.length > 0 ? (
              stats.recentLeaves.map((l: any) => (
                <div key={l._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
                   <div className="flex justify-between mb-1">
                    <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">{l.user.name}</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-bold px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 rounded">Pending</span>
                  </div>
                  <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400 font-medium space-x-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic truncate">"{l.reason}"</p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400 italic text-sm">No pending leave requests.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
