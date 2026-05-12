import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { CheckCircle, Clock, User } from 'lucide-react';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await api.put(`/complaints/${id}`, { status: 'resolved' });
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Complaint Management</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {complaints.map((c) => (
              <tr key={c._id}>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{c.user.name}</p>
                      <p className="text-gray-500">{c.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{c.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{c.description}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    c.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {c.status === 'resolved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {c.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {c.status !== 'resolved' && (
                    <button
                      onClick={() => handleResolve(c._id)}
                      className="text-green-600 hover:text-green-900 font-medium text-sm"
                    >
                      Mark Resolved
                    </button>
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

export default AdminComplaints;