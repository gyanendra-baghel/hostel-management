import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Check, X, User, Calendar, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const AdminLeaveRequests = () => {
  const [leaves, setLeaves] = useState<any[]>([]);

  // Search and Pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeaves = async () => {
    try {
      const res = await api.get(`/leave?search=${searchTerm}&page=${currentPage}&limit=10`);
      setLeaves(res.data.leaves);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeaves();
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await api.put(`/leave/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Leave Requests</h1>
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by student, email or reason..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaves.length > 0 ? (
              leaves.map((l) => (
                <tr key={l._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm">
                      <div className="p-2 bg-gray-100 rounded-full mr-3 text-gray-500">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{l.user.name}</p>
                        <p className="text-xs text-gray-500">{l.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center text-gray-700 font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" title={l.reason}>
                    {l.reason}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      l.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      l.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {l.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {l.status === 'pending' ? (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleStatusUpdate(l._id, 'approved')}
                          className="text-green-600 hover:text-green-900 p-1.5 rounded-full hover:bg-green-50 transition"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(l._id, 'rejected')}
                          className="text-red-600 hover:text-red-900 p-1.5 rounded-full hover:bg-red-50 transition"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs italic capitalize">{l.status}</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500 italic">
                  No leave requests found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeaveRequests;