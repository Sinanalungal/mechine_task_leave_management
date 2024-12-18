import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
} from 'lucide-react';
import { getAxiosInstance } from '../../utils/axiosInstance';

const LeaveStatistics = ({updateStatistics}) => {
    const [requestStats, setRequestStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Monochrome color palette
    const colorPalette = {
        pending: 'bg-yellow-100 text-gray-900 border border-gray-300',
        approved: 'bg-green-100 text-gray-900 border border-gray-300',
        rejected: 'bg-red-100 text-gray-900 border border-gray-300',
    };

    const fetchLeaveStats = async () => {
        try {
            const axiosInstance = await getAxiosInstance()
            const response = await axiosInstance('/leave/leave-applications/status_counts/');
            console.log(response);
            setRequestStats(response.data);
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
        return <div className="text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
            {[
                { 
                    icon: Clock, 
                    palette: colorPalette.pending,
                    label: 'Pending Requests', 
                    value: requestStats.pending 
                },
                { 
                    icon: CheckCircle, 
                    palette: colorPalette.approved,
                    label: 'Approved Requests', 
                    value: requestStats.approved 
                },
                { 
                    icon: XCircle, 
                    palette: colorPalette.rejected,
                    label: 'Rejected Requests', 
                    value: requestStats.rejected 
                }
            ].map((stat) => (
                <motion.div 
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className={`
                        ${stat.palette} p-6 rounded-3xl shadow-lg flex items-center 
                        relative overflow-hidden
                    `}
                >
                    <div className="absolute -top-4 -right-4 opacity-20">
                        <stat.icon className="w-24 h-24" />
                    </div>
                    <div className="z-10">
                        <div className="text-sm opacity-70">{stat.label}</div>
                        <div className="text-3xl font-bold">{stat.value}</div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default LeaveStatistics;