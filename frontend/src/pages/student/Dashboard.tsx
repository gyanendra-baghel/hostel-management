import { useEffect, useState, useRef } from 'react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Building, User, Mail, Shield, Calendar, Fingerprint, Camera, Loader2 } from 'lucide-react';

interface RoomData {
  room: {
    roomNumber: string;
    status: string;
  };
  startDate: string;
}

const StudentDashboard = () => {
  const { user, updateUser } = useAuth();
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Frontend validation: 2MB limit
    if (file.size > 2 * 1024 * 1024) {
      alert('File size too large. Please select an image under 2MB.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const res = await api.post('/auth/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      updateUser({ profileImage: res.data.profileImage });
    } catch (err: any) {
      console.error('Upload failed:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || 'Failed to upload image. Please try again.';
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 border-b dark:border-gray-800 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Student Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, <span className="text-blue-600 dark:text-blue-400 font-semibold">{user?.name}</span></p>
        </div>

        {/* Profile Image Section */}
        <div className="relative group self-start md:self-auto">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-700 shadow-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {user?.profileImage ? (
              <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-300 dark:text-gray-600" />
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors disabled:opacity-50"
            title="Update Profile Picture"
          >
            <Camera className="w-4 h-4" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Information Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-3 border-b border-blue-100 dark:border-blue-900/30 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-blue-900 dark:text-blue-300">Profile Information</h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Full Name</label>
              <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium text-lg">
                <User className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-600" />
                {user?.name}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email Address</label>
              <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
                <Mail className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-600" />
                {user?.email}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Account Role</label>
              <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
                <Shield className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-600" />
                <span className="capitalize">{user?.role}</span>
              </div>
            </div>

            <div className="space-y-1 col-span-full pt-2 border-t border-gray-50 dark:border-gray-700">
              <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
                <Fingerprint className="w-3 h-3 mr-1" />
                User ID: {user?._id}
              </div>
            </div>
          </div>
        </div>

        {/* Room Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/20 px-6 py-3 border-b border-green-100 dark:border-green-900/30 flex items-center">
            <Building className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
            <h2 className="text-lg font-bold text-green-900 dark:text-green-300">Room Details</h2>
          </div>

          <div className="p-6">
            {roomData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Room Number</label>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {roomData.room.roomNumber}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Room Status</label>
                  <div className="pt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${roomData.room.status === 'occupied' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                      {roomData.room.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Assigned Date</label>
                  <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium pt-1">
                    <Calendar className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-600" />
                    {new Date(roomData.startDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Building className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 italic">No room assigned yet.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Please contact the hostel administrator for your room allocation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
