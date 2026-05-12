import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    try {
      const res = await api.get('/leave/my');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leave', formData);
      setFormData({ reason: '', startDate: '', endDate: '' });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Leave Requests</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          New Leave Application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Reason</label>
            <textarea
              name="reason"
              className="w-full p-2 border border-gray-300 rounded h-24"
              value={formData.reason}
              onChange={handleChange}
              placeholder="State the reason for leave..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
          >
            {loading ? 'Submitting...' : 'Apply for Leave'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Leave History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Dates</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaves.length > 0 ? (
                leaves.map((l) => (
                  <tr key={l._id}>
                    <td className="px-6 py-4 text-sm">
                      {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{l.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        l.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        l.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {l.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                         l.status === 'rejected' ? <XCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">No leave history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;