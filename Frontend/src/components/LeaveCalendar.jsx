import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Calendar, 
    Users, 
    CheckCircle, 
    XCircle, 
    ChevronLeft, 
    ChevronRight, 
    Coffee,
    Umbrella,
    Plane,
    Stethoscope,
    MoreHorizontal
} from 'lucide-react';
import { getAxiosInstance } from '../utils/axiosInstance';

const LeaveCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leaveData, setLeaveData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Enhanced Leave Types (map backend leave types)
    const leaveTypes = {
        1: { icon: Umbrella, color: 'emerald', name: 'Annual Leave' },
        2: { icon: Stethoscope, color: 'blue', name: 'Sick Leave' },
        3: { icon: Coffee, color: 'purple', name: 'Compassionate Leave' },
        4: { icon: Plane, color: 'orange', name: 'Vacation' }
    };

    // Fetch leave applications from backend
    useEffect(() => {
        const fetchLeaveApplications = async () => {
            try {
                const axiosInstance = await getAxiosInstance()
                const response = await axiosInstance.get('/leave/leave-applications/', {
                    // Add any necessary authentication headers
                    // headers: { 'Authorization': `Bearer ${yourToken}` }
                });
                
                // Transform backend data to match component's expected format
                const transformedLeaveData = response.data.map(leave => ({
                    id: leave.id,
                    name: `Employee ${leave.employee}`, // Replace with actual employee name if available
                    type: leaveTypes[leave.leave_type]?.name || 'Unknown Leave',
                    startDate: new Date(leave.start_date),
                    endDate: new Date(leave.end_date),
                    status: leave.status.charAt(0).toUpperCase() + leave.status.slice(1),
                    reason: leave.reason
                }));

                setLeaveData(transformedLeaveData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leave applications:', error);
                setLoading(false);
            }
        };

        fetchLeaveApplications();
    }, []);

    // Existing calendar generation logic
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        
        const days = [];
        
        // Pad with empty days
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(selectedYear, selectedMonth, day);
            const leavesOnDay = leaveData.filter(leave => 
                currentDate >= leave.startDate && currentDate <= leave.endDate
            );
            
            days.push({
                day,
                leaves: leavesOnDay
            });
        }

        return days;
    };
    // const LoadingScreen = () => {
    //     return (
    //         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
    //             <motion.div
    //                 initial={{ scale: 0.6, opacity: 0 }}
    //                 animate={{ 
    //                     scale: [0.6, 1.1, 1],
    //                     opacity: [0, 1, 1],
    //                     rotate: [0, 360]
    //                 }}
    //                 transition={{
    //                     duration: 1.5,
    //                     ease: "easeInOut",
    //                     times: [0, 0.5, 1],
    //                     repeat: Infinity,
    //                     repeatType: "reverse"
    //                 }}
    //                 className="mb-6"
    //             >
    //                 <Calendar className="w-24 h-24 text-indigo-600 drop-shadow-xl" />
    //             </motion.div>
                
    //             <motion.div
    //                 initial={{ opacity: 0, y: 20 }}
    //                 animate={{ opacity: 1, y: 0 }}
    //                 transition={{ 
    //                     delay: 0.5,
    //                     duration: 0.6,
    //                     type: "spring",
    //                     stiffness: 100 
    //                 }}
    //                 className="flex flex-col items-center"
    //             >
    //                 <h2 className="text-2xl font-bold text-indigo-800 mb-2">
    //                     Loading Leave Calendar
    //                 </h2>
    //                 <p className="text-gray-600 text-sm">
    //                     Fetching leave applications...
    //                 </p>
    //             </motion.div>

    //             {/* Subtle background animation */}
    //             <motion.div 
    //                 initial={{ opacity: 0 }}
    //                 animate={{ 
    //                     opacity: [0, 0.1, 0],
    //                     scale: [1, 1.5, 2]
    //                 }}
    //                 transition={{
    //                     duration: 3,
    //                     repeat: Infinity,
    //                     repeatType: "loop"
    //                 }}
    //                 className="absolute inset-0 bg-indigo-200 -z-10"
    //             />
    //         </div>
    //     );
    // };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calendarDays = generateCalendarDays();

    const handlePrevMonth = () => {
        setSelectedMonth(prev => {
            if (prev === 0) {
                setSelectedYear(prev => prev - 1);
                return 11;
            }
            return prev - 1;
        });
    };

    const handleNextMonth = () => {
        setSelectedMonth(prev => {
            if (prev === 11) {
                setSelectedYear(prev => prev + 1);
                return 0;
            }
            return prev + 1;
        });
    };

    // Calculate leave summary
    const leaveSummary = useMemo(() => {
        return leaveData.reduce((acc, leave) => {
            acc[leave.status.toLowerCase()]++;
            return acc;
        }, { approved: 0, pending: 0, rejected: 0 });
    }, [leaveData]);

    

    return (
        <div className="min-h-screen w-full max-w-full overflow-x-auto bg-gradient-to-br from-gray-50 to-white font-inter text-gray-900 p-2 sm:p-4 lg:p-6">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="container mx-auto  max-w-full sm:max-w-5xl"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between rounded-t-2xl shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-black text-white flex items-center mb-2 sm:mb-0">
                        <Calendar className="mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> Leave Tracker
                    </h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <motion.button 
                            onClick={handlePrevMonth}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white/80 hover:text-white"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>
                        <div className="text-white font-semibold text-xs sm:text-sm">
                            {monthNames[selectedMonth]} {selectedYear}
                        </div>
                        <motion.button 
                            onClick={handleNextMonth}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white/80 hover:text-white"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Calendar Container */}
                <div className="bg-white shadow-xl  rounded-b-2xl overflow-hidden">
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 p-1 sm:p-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div 
                                key={day} 
                                className="text-center font-bold text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider"
                            >
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((dayData, index) => (
                            <motion.div 
                                key={index} 
                                className={`
                                    border rounded-lg min-h-[40px] sm:min-h-[60px] relative overflow-hidden
                                    ${dayData ? 'bg-white hover:bg-gray-50' : 'bg-gray-100'}
                                `}
                                whileHover={dayData ? { scale: 1.02 } : {}}
                            >
                                {dayData && (
                                    <>
                                        <div className="text-right p-0.5 sm:p-1 text-[10px] sm:text-xs font-semibold text-gray-500">
                                            {dayData.day}
                                        </div>
                                        <AnimatePresence>
                                            {dayData.leaves.map((leave, leaveIndex) => {
                                                const LeaveIcon = leaveTypes[leave.type]?.icon || MoreHorizontal;
                                                const color = leaveTypes[leave.type]?.color || 'gray';
                                                
                                                return (
                                                    <motion.div
                                                        key={leaveIndex}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        onClick={() => setSelectedLeave(leave)}
                                                        className={`
                                                            text-[10px] sm:text-xs p-0.5 sm:p-1 rounded mt-0.5 sm:mt-1 mx-0.5 sm:mx-1 flex items-center cursor-pointer
                                                            ${leave.status === 'Approved' ? `bg-${color}-100 text-${color}-800` : 
                                                              leave.status === 'Pending' ? `bg-amber-100 text-amber-600` : 
                                                              'bg-rose-100 text-rose-800'}
                                                        `}
                                                    >
                                                        <LeaveIcon className="mr-0.5 sm:mr-1 w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                        {leave.name}
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Leave Summary */}
                    <div className="bg-gray-50 p-3 sm:p-4">
                        <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center text-gray-800">
                            <Users className="mr-1 sm:mr-2 text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" /> Leave Overview
                        </h2>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-emerald-50 p-2 sm:p-3 rounded-lg shadow-md"
                            >
                                <CheckCircle className="mr-1 sm:mr-2 text-emerald-600 w-4 h-4 sm:w-5 sm:h-5" />
                                <div>
                                    <div className="font-bold text-emerald-800 text-[10px] sm:text-xs">Approved</div>
                                    <div className="text-base sm:text-xl font-black text-emerald-600">{leaveSummary.approved}</div>
                                </div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-amber-50 p-2 sm:p-3 rounded-lg shadow-md"
                            >
                                <MoreHorizontal className="mr-1 sm:mr-2 text-amber-600 w-4 h-4 sm:w-5 sm:h-5" />
                                <div>
                                    <div className="font-bold text-amber-800 text-[10px] sm:text-xs">Pending</div>
                                    <div className="text-base sm:text-xl font-black text-amber-600">{leaveSummary.pending}</div>
                                </div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center bg-rose-50 p-2 sm:p-3 rounded-lg shadow-md"
                            >
                                <XCircle className="mr-1 sm:mr-2 text-rose-600 w-4 h-4 sm:w-5 sm:h-5" />
                                <div>
                                    <div className="font-bold text-rose-800 text-[10px] sm:text-xs">Rejected</div>
                                    <div className="text-base sm:text-xl font-black text-rose-600">{leaveSummary.rejected}</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Leave Details Modal */}
                <AnimatePresence>
                    {selectedLeave && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
                            onClick={() => setSelectedLeave(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-md w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center mb-3 sm:mb-4">
                                    {React.createElement(leaveTypes[selectedLeave.type]?.icon || MoreHorizontal, {
                                        className: `mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8 text-${leaveTypes[selectedLeave.type]?.color || 'gray'}-600`
                                    })}
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold">{selectedLeave.type}</h3>
                                        {/* <p className="text-xs sm:text-sm text-gray-500"></p> */}
                                    </div>
                                </div>
                                <div className="space-y-1.5 sm:space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 text-xs sm:text-sm">Start Date:</span>
                                        <span className="font-semibold text-xs sm:text-sm">{selectedLeave.startDate.toDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 text-xs sm:text-sm">End Date:</span>
                                        <span className="font-semibold text-xs sm:text-sm">{selectedLeave.endDate.toDateString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs font-bold
                                            ${selectedLeave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 
                                              selectedLeave.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                                              'bg-rose-100 text-rose-800'}
                                        `}>
                                            {selectedLeave.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default LeaveCalendar;