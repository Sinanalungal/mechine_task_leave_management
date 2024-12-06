import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, ArrowUpRight } from 'lucide-react';
import { getAxiosInstance } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const RecentLeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // Filter status (all, approved, pending, rejected)
    const [currentPage, setCurrentPage] = useState(1);
    const navigate= useNavigate()
    // Fetch leave requests
    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const axiosInstance = await getAxiosInstance();
                setLoading(true);
                const response = await axiosInstance.get('/leave/leave-applications/', {
                    params: { page: currentPage, status: 'pending' },
                });
                // Limit to the first 4 results
                const limitedResults = response.data.results.slice(0, 4);
                console.log(limitedResults);
                setLeaveRequests(limitedResults);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch leave requests');
                setLoading(false);
                console.log(err);
            }
        };
    
        fetchLeaveRequests();
    }, [currentPage]);
    // Refetch on page change

    // Memoized filtered requests based on the status filter
    const filteredRequests = useMemo(() => {
        return leaveRequests.filter((request) => filter === 'all' || request.status.toLowerCase() === filter);
    }, [leaveRequests, filter]);

    // Status styling function
    const getStatusClasses = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-emerald-100 text-emerald-800';
            case 'pending':
                return 'bg-amber-100 text-amber-800';
            case 'rejected':
                return 'bg-rose-100 text-rose-800';
            default:
                return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
            <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-between">
                <h2 className="text-base sm:text-xl font-bold text-white flex items-center">
                    <Inbox className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" /> Recent Leave Requests
                </h2>
                <button
                    onClick={() => {navigate('leave-approvals')}}
                    className="text-white/80 hover:text-white transition-colors text-xs sm:text-sm font-medium flex items-center"
                >
                    { 'Show All'} 
                    <ArrowUpRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </button>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden p-4 space-y-4">
                {filteredRequests.map((leave, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: index * 0.1,
                            type: 'tween',
                        }}
                        className="bg-gray-50 rounded-2xl p-4 space-y-3"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={leave.employee.profile_picture ?? 'https://via.placeholder.com/150'}
                                alt={leave.employee.first_name }
                                className="w-10 h-10 rounded-full object-cover shadow-md"
                            />
                            <div>
                                <div className="font-bold text-gray-800">{(leave.employee.first_name + ' ' + leave.employee.last_name).toLocaleUpperCase()}</div>
                                <div className="text-xs text-gray-500">{leave.employee.department}</div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                <div>{leave.leave_type.name}</div>
                                <div className="text-xs text-gray-500">{leave.start_date+ ' - ' +leave.end_date}</div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(leave.status)}`}
                            >
                                {leave.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Desktop View - Table */}
            <table className="w-full hidden md:table">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Leave Type</th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence>
                        {filteredRequests.map((leave, index) => (
                            <motion.tr
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{
                                    delay: index * 0.1,
                                    type: 'tween',
                                }}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-4 flex items-center space-x-4">
                                    <img
                                        src={leave.employee.profile_picture ?? 'https://via.placeholder.com/150'}
                                        alt={leave.employee.first_name}
                                        className="w-12 h-12 rounded-full object-cover shadow-md"
                                    />
                                    <div>
                                        <div className="font-bold text-gray-800">{(leave.employee.first_name + ' ' + leave.employee.last_name).toLocaleUpperCase()}</div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{leave.employee.department}</td>
                                <td className="p-4 text-sm text-gray-600">{leave.leave_type.name}</td>
                                <td className="p-4 text-sm text-gray-600">{leave.start_date+ ' - ' +leave.end_date}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(leave.status)}`}
                                    >
                                        {leave.status}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </motion.div>
    );
};

export default RecentLeaveRequests;
