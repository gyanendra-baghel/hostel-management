import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Check, X, User, Calendar } from 'lucide-react';

const AdminLeaveRequests = () => {
  const [leaves, setLeaves] = useState<any[]>([]);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.put(`/leave/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Leave Requests</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dates</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaves.map((l) => (
              <tr key={l._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{l.user.name}</p>
                      <p className="text-gray-500">{l.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{l.reason}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    l.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    l.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {l.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {l.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleStatusUpdate(l._id, 'approved')}
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(l._id, 'rejected')}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveRequests;