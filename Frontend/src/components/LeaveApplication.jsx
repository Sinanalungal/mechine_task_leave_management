import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  FileText,
  User,
  Mail,
  Clock,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { getAxiosInstance } from "../utils/axiosInstance";
import { toast } from 'react-hot-toast';

const LeaveApplication = () => {
    const [formData, setFormData] = useState({
        leave_type: '',
        start_date: '', // Changed to match backend expected field
        end_date: '',   // Changed to match backend expected field
        reason: '',
        contact_details: '' // Changed to match backend expected field
    });
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveBalances, setLeaveBalances] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const axiosInstance = await getAxiosInstance();
                
                // Fetch leave types
                const leaveTypesResponse = await axiosInstance.get('/leave/leave-types/');
                console.log(leaveTypesResponse.data);
                
                setLeaveTypes(leaveTypesResponse.data);

                // // Fetch leave balances
                // const leaveBalancesResponse = await axiosInstance.get('/leave/leave-balances/');
                // setLeaveBalances(leaveBalancesResponse.data);
            } catch (error) {
                toast.error('Failed to load leave information');
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const axiosInstance = await getAxiosInstance();
            
            // Validate form data
            if (!formData.leave_type || !formData.start_date || !formData.end_date) {
                toast.error('Please fill all required fields');
                setIsSubmitting(false);
                return;
            }

            // Submit leave application
            const response = await axiosInstance.post('/leave/leave-applications/', {
                leave_type:  Number(formData.leave_type),
                start_date: formData.start_date,
                end_date: formData.end_date,
                reason: formData.reason,
                contact_details: formData.contact_details
            });

            // Show success message
            toast.success('Leave application submitted successfully');
            
            // Reset form
            setFormData({
                leave_type: '',
                start_date: '',
                end_date: '',
                reason: '',
                contact_details: ''
            });
        } catch (error) {
            // Handle error
            const errorMsg = error.response?.data?.detail || 
                             error.response?.data?.non_field_errors?.[0] || 
                             'Failed to submit leave application';
            toast.error(errorMsg);
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-white font-inter text-gray-900 px-4 py-6 sm:p-6 lg:p-10">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="container mx-auto max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
                    <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center mb-2 sm:mb-0">
                        <FileText className="mr-2 sm:mr-4 w-6 h-6 sm:w-10 sm:h-10" />
                        Leave Application
                    </h1>
                </div>

                {/* Form Container */}
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
                    {/* Left Side - Form Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* Leave Type */}
                        <div>
                            <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
                                <Calendar className="mr-2 text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
                                Leave Type
                            </label>
                            <select
                                name="leave_type"
                                value={formData.leave_type}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm sm:text-base"
                                required
                            >
                                <option value="">Select Leave Type</option>
                                {leaveTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
                                    <Clock className="mr-2 text-emerald-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm sm:text-base"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
                                    <Clock className="mr-2 text-rose-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm sm:text-base"
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Additional Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* Reason */}
                        <div>
                            <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
                                <User className="mr-2 text-amber-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
                                Reason for Leave
                            </label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm sm:text-base"
                                placeholder="Provide a brief explanation"
                            />
                        </div>

                        {/* Contact Details */}
                        <div>
                            <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
                                <Mail className="mr-2 text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
                                Contact During Leave
                            </label>
                            <input
                                type="text"
                                name="contact_details"
                                value={formData.contact_details}
                                onChange={handleChange}
                                className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
                                placeholder="Phone or email for emergency contact"
                            />
                        </div>
                    </motion.div>

                    {/* Full Width - Information & Submit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                    >
                        {/* Alert */}
                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg flex items-center text-sm">
                            <AlertCircle className="mr-2 sm:mr-3 text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
                            <p className="text-blue-800 text-xs sm:text-sm">
                                Ensure all details are accurate. Your leave request will be
                                reviewed by your manager.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm sm:text-base disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Leave Application'}
                            <ArrowUpRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default LeaveApplication;