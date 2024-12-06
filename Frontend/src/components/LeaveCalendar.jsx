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
    MoreHorizontal,
    Calendar1
} from 'lucide-react';
import { getAxiosInstance } from '../utils/axiosInstance';

const LeaveCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leaveData, setLeaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const [isMonthYearModalOpen, setIsMonthYearModalOpen] = useState(false);

    

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
                setLoading(true);
                setError(null);
                const axiosInstance = await getAxiosInstance();
                
                const response = await axiosInstance.get('/leave/leave-applications/', {
                    params: {
                        year: selectedYear,
                        month: selectedMonth + 1 // Backend typically uses 1-12 for months
                    }
                });
                
                const transformedLeaveData = response.data.results.map(leave => ({
                    id: leave.id,
                    name: `${leave.leave_type?.name || 'Unknown'}`, 
                    type: leave.leave_type?.name || '4', // Default to Vacation if not specified
                    startDate: new Date(leave.start_date),
                    endDate: new Date(leave.end_date),
                    status: (leave.status || 'Pending').charAt(0).toUpperCase() + 
                            (leave.status || 'Pending').slice(1),
                    reason: leave.reason || 'No reason provided'
                }));
                
                setLeaveData(transformedLeaveData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leave applications:', error);
                setError('Failed to fetch leave applications');
                setLeaveData([]);
                setLoading(false);
            }
        };

        fetchLeaveApplications();
    }, [selectedMonth, selectedYear]);
    const generateCalendarDays = () => {
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
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
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const yearRange = Array.from(
        { length: 11 }, 
        (_, index) => new Date().getFullYear() - 5 + index
    );

    const calendarDays = generateCalendarDays();

    const handleDirectDateSelect = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
        setIsMonthYearModalOpen(false);
    };

    const handlePrevMonth = () => {
        setSelectedMonth(prev => {
            if (prev === 0) {
                setSelectedYear(currentYear => currentYear - 1);
                return 11;
            }
            return prev - 1;
        });
    };
    
    const handleNextMonth = () => {
        setSelectedMonth(prev => {
            if (prev === 11) {
                setSelectedYear(currentYear => currentYear + 1);
                return 0;
            }
            return prev + 1;
        });
    };

    // Calculate leave summary with robust error handling
    const leaveSummary = useMemo(() => {
        const summary = { 
            approved: 0, 
            pending: 0, 
            rejected: 0 
        };

        if (!leaveData || leaveData.length === 0) return summary;

        return leaveData.reduce((acc, leave) => {
            const status = leave.status.toLowerCase();
            if (status in acc) {
                acc[status]++;
            }
            return acc;
        }, summary);
    }, [leaveData]);

    // Rest of the component remains the same...

    // Add error handling to render
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    

    return (
        <div className="min-h-screen w-full max-w-full overflow-x-auto bg-gradient-to-br from-gray-50 to-white font-inter text-gray-900 p-2 sm:p-4 lg:p-6">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="container mx-auto  max-w-full sm:max-w-5xl"
            >
                {/* Header */}
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between rounded-t-2xl shadow-lg">
                    <h1 className="text-xl sm:text-2xl font-black text-white flex items-center mb-2 sm:mb-0">
                        <Calendar className="mr-2 sm:mr-3 w-6 h-6 sm:w-8 sm:h-8" /> Leave Tracker
                    </h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <motion.button 
                            // onClick={handlePrevMonth}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white/80 hover:text-white"
                        >
                            <Calendar1 className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button>
                        <div 
                            className="text-white font-semibold text-xs sm:text-sm cursor-pointer"
                            onClick={() => setIsMonthYearModalOpen(true)}
                        >
                            {monthNames[selectedMonth]} {selectedYear}
                        </div>
                        {/* <motion.button 
                            onClick={handleNextMonth}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white/80 hover:text-white"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </motion.button> */}
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
                                        <h3 className="text-lg sm:text-xl font-bold">{selectedLeave?.type}</h3>
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
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 text-xs sm:text-sm">Reason:</span>
                                        <span className=" text-xs sm:text-sm">{selectedLeave?.reason}</span>
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
                <AnimatePresence>
                    {isMonthYearModalOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50"
                            onClick={() => setIsMonthYearModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white rounded-lg p-4 sm:p-6 max-w-xs sm:max-w-md w-full shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-lg font-bold mb-4 text-center">Select Month and Year</h3>
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {monthNames.map((month, index) => (
                                        <button
                                            key={month}
                                            onClick={() => handleDirectDateSelect(index, selectedYear)}
                                            className={`p-2 rounded ${
                                                selectedMonth === index 
                                                    ? 'bg-indigo-500 text-white' 
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        >
                                            {month.substring(0, 3)}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {yearRange.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => handleDirectDateSelect(selectedMonth, year)}
                                            className={`p-2 rounded ${
                                                selectedYear === year 
                                                    ? 'bg-indigo-500 text-white' 
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
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