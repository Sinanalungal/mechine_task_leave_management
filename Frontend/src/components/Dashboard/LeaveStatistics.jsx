import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { getAxiosInstance } from '../../utils/axiosInstance';

const LeaveStatistics = () => {
    const [requestStats, setRequestStats] = useState( []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch leave statistics data
    const fetchLeaveStats = async () => {
        try {
            const axiosInstance =await getAxiosInstance()
            const response = await axiosInstance.get('/leave/leave-applications/status_counts/');
            const data = response.data;
            console.log(data);
            

            // Calculate percentages
            const total = data.total;
            const pendingPercentage = total ? ((data.pending / total) * 100).toFixed(2) : 0;
            const approvedPercentage = total ? ((data.approved / total) * 100).toFixed(2) : 0;
            const rejectedPercentage = total ? ((data.rejected / total) * 100).toFixed(2) : 0;

            setRequestStats([
                { 
                    label: 'Total', 
                    value: data.total, 
                    percentage: '100', 
                    icon: <Calendar className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
                    color: 'bg-indigo-50', 
                    textColor: 'text-indigo-600'
                },
                { 
                    label: 'Pending', 
                    value: data.pending, 
                    percentage: pendingPercentage, 
                    icon: <Clock className="w-6 h-6 md:w-8 md:h-8 text-amber-500" />,
                    color: 'bg-amber-50', 
                    textColor: 'text-amber-600'
                },
                { 
                    label: 'Approved', 
                    value: data.approved, 
                    percentage: approvedPercentage, 
                    icon: <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-emerald-500" />,
                    color: 'bg-emerald-50', 
                    textColor: 'text-emerald-600'
                },
                { 
                    label: 'Rejected', 
                    value: data.rejected, 
                    percentage: rejectedPercentage, 
                    icon: <XCircle className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />,
                    color: 'bg-rose-50', 
                    textColor: 'text-rose-600'
                }
                
            ]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        fetchLeaveStats();
        
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
            {requestStats.map((stat, index) => (
                <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                    }}
                    className={`
                        ${stat.color} rounded-2xl sm:rounded-3xl p-3 sm:p-6 
                        flex flex-col justify-between 
                        relative overflow-hidden 
                        shadow-xl hover:shadow-2xl 
                        transition-all duration-300
                    `}
                >
                    <div className="flex justify-between items-center mb-2 sm:mb-4">
                        {stat.icon}
                        <div className={`${stat.textColor} font-bold text-xs sm:text-sm flex items-center`}>
                            {stat.percentage}% {/* Display percentage */}
                        </div>
                    </div>
                    <div>
                        <div className={`text-2xl sm:text-4xl font-black ${stat.textColor} mb-1`}>
                            {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 font-medium">
                            {stat.label}
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 sm:w-20 sm:h-20 bg-white/10 rounded-full"></div>
                </motion.div>
            ))}
        </div>
    );
};

export default LeaveStatistics;
