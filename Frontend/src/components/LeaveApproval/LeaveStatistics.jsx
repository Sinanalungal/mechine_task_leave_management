import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
} from 'lucide-react';
import { getAxiosInstance } from '../../utils/axiosInstance';

const LeaveStatistics = () => {
    const [requestStats, setRequestStats] = useState({
        pending: 0,
        approved: 0,
        rejected: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Color palette for each status
    const colorPalette = {
        pending: 'bg-gradient-to-br from-[#ff9966] to-[#ff5e62]',
        approved: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]',
        rejected: 'bg-gradient-to-br from-[#ff416c] to-[#ff4b2b]',
    };

    useEffect(() => {
        const fetchLeaveStats = async () => {
            try {
                const axiosInstance = await getAxiosInstance()
                const response = await axiosInstance('/leave/leave-applications/status_counts/');
                console.log(response);
                // const data = await response.json();
                setRequestStats(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Fetch error:', err);
            }
        };

        fetchLeaveStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                    gradient: colorPalette.pending,
                    label: 'Pending Requests', 
                    value: requestStats.pending 
                },
                { 
                    icon: CheckCircle, 
                    gradient: colorPalette.approved,
                    label: 'Approved Requests', 
                    value: requestStats.approved 
                },
                { 
                    icon: XCircle, 
                    gradient: colorPalette.rejected,
                    label: 'Rejected Requests', 
                    value: requestStats.rejected 
                }
            ].map((stat) => (
                <motion.div 
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className={`
                        ${stat.gradient} p-6 rounded-3xl shadow-2xl flex items-center 
                        text-white relative overflow-hidden
                    `}
                >
                    <div className="absolute -top-4 -right-4 opacity-20">
                        <stat.icon className="w-24 h-24" />
                    </div>
                    <div className="z-10">
                        <div className="text-sm opacity-80">{stat.label}</div>
                        <div className="text-3xl font-black">{stat.value}</div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default LeaveStatistics;
