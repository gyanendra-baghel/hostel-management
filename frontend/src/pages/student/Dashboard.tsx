import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Building, User, Mail, Shield, Calendar, Fingerprint } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get('/rooms/my-room');
        setRoomData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, <span className="text-blue-600 font-semibold">{user?.name}</span></p>
      </div>

      <div className="space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-bold text-blue-900">Profile Information</h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
              <div className="flex items-center text-gray-800 font-medium text-lg">
                <User className="w-4 h-4 mr-2 text-gray-300" />
                {user?.name}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center text-gray-800 font-medium">
                <Mail className="w-4 h-4 mr-2 text-gray-300" />
                {user?.email}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Role</label>
              <div className="flex items-center text-gray-800 font-medium">
                <Shield className="w-4 h-4 mr-2 text-gray-300" />
                <span className="capitalize">{user?.role}</span>
              </div>
            </div>

            <div className="space-y-1 col-span-full pt-2 border-t border-gray-50">
              <div className="flex items-center text-xs text-gray-400">
                <Fingerprint className="w-3 h-3 mr-1" />
                User ID: {user?._id}
              </div>
            </div>
          </div>
        </div>

        {/* Room Details Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 px-6 py-3 border-b border-green-100 flex items-center">
            <Building className="w-5 h-5 mr-2 text-green-600" />
            <h2 className="text-lg font-bold text-green-900">Room Details</h2>
          </div>

          <div className="p-6">
            {roomData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Room Number</label>
                  <div className="text-3xl font-bold text-blue-600">
                    {roomData.room.roomNumber}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Room Status</label>
                  <div className="pt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${roomData.room.status === 'occupied' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {roomData.room.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Assigned Date</label>
                  <div className="flex items-center text-gray-800 font-medium pt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-300" />
                    {new Date(roomData.startDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Building className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 italic">No room assigned yet.</p>
                <p className="text-sm text-gray-400">Please contact the hostel administrator for your room allocation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
