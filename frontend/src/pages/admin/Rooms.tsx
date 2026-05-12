import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Plus, UserPlus, X, UserMinus, User, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal';

const Rooms = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('2');
  const [loading, setLoading] = useState(false);

  // Search and Pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showUnassignConfirm, setShowUnassignConfirm] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [assignmentToRevoke, setAssignmentToRevoke] = useState<string | null>(null);
  
  const [studentEmail, setStudentEmail] = useState('');
  const [assignError, setAssignError] = useState('');

  const fetchRooms = async () => {
    try {
      const res = await api.get(`/rooms?search=${searchTerm}&page=${currentPage}&limit=10`);
      setRooms(res.data.rooms);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRooms();
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/rooms', { roomNumber, capacity: parseInt(capacity) });
      setRoomNumber('');
      setCapacity('2');
      setShowAddModal(false);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    setAssignError('');
    try {
      await api.post('/rooms/assign', { 
        email: studentEmail, 
        roomId: selectedRoom._id 
      });
      setStudentEmail('');
      setShowAssignModal(false);
      fetchRooms();
    } catch (err: any) {
      setAssignError(err.response?.data?.msg || 'Assignment failed');
    }
  };

  const confirmUnassign = (assignmentId: string) => {
    setAssignmentToRevoke(assignmentId);
    setShowUnassignConfirm(true);
  };

  const handleUnassign = async () => {
    if (!assignmentToRevoke) return;
    
    try {
      await api.put(`/rooms/unassign/${assignmentToRevoke}`);
      setShowUnassignConfirm(false);
      setAssignmentToRevoke(null);
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert('Failed to revoke access');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search room number..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </form>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md whitespace-nowrap"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Room
          </button>
        </div>
      </div>

      {/* Room List - Full Width */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room #</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Occupants</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{room.roomNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{room.capacity} Persons</td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      {room.occupants && room.occupants.length > 0 ? (
                        room.occupants.map((occ: any) => (
                          <div key={occ._id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100 group">
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-2 text-gray-400" />
                              <div className="text-sm">
                                <p className="font-medium text-gray-800">{occ.user.name}</p>
                                <p className="text-xs text-gray-500">{occ.user.email}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => confirmUnassign(occ._id)}
                              className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition"
                              title="Revoke Access"
                            >
                              <UserMinus className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs italic">No occupants</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      room.status === 'vacant' ? 'bg-green-100 text-green-800' :
                      room.status === 'partial' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {room.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => { setSelectedRoom(room); setShowAssignModal(true); }}
                      className="text-blue-600 hover:text-blue-900 font-medium text-sm flex items-center bg-blue-50 px-3 py-1 rounded-md transition"
                      disabled={room.status === 'occupied'}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Assign
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                  No rooms found. Try a different search or click "Add Room" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Add New Room</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateRoom} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="e.g. 101, A-12"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition shadow-md"
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Assign Student to {selectedRoom?.roomNumber}</h2>
              <button onClick={() => setShowAssignModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleAssign} className="p-6">
              {assignError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                  {assignError}
                </div>
              )}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
                <input
                  type="email"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="student@example.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Confirm Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unassign Confirmation Modal */}
      <ConfirmModal
        isOpen={showUnassignConfirm}
        title="Revoke Room Access"
        message="Are you sure you want to revoke access for this student? This will mark their current room assignment as completed and free up the space."
        confirmText="Revoke Access"
        onConfirm={handleUnassign}
        onCancel={() => {
          setShowUnassignConfirm(false);
          setAssignmentToRevoke(null);
        }}
        type="danger"
      />
    </div>
  );
};

export default Rooms;
