import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [type, setType] = useState('Electricity');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    try {
      const res = await api.get('/complaints/my');
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/complaints', { type, description });
      setDescription('');
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Complaints</h1>

      {/* New Complaint Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Raise a New Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Internet">Internet</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the issue..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold p-6 border-b">Recent Complaints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complaints.length > 0 ? (
                complaints.map((c) => (
                  <tr key={c._id}>
                    <td className="px-6 py-4 font-medium text-gray-900">{c.type}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{c.description}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        c.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {c.status === 'resolved' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500 italic">No complaints found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complaints;