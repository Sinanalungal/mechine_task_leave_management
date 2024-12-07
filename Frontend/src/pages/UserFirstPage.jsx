import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plane, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/m';

const WelcomeComponent = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white font-roboto text-gray-900 px-4 py-6 sm:p-6 lg:p-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="container mx-auto max-w-2xl bg-white rounded-3xl shadow-lg overflow-hidden p-8 text-center"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <Calendar className="text-blue-600" size={40} />
            <h1 className="text-4xl font-bold text-gray-800">
              Leave Management
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            Simplify your leave application process with our intuitive platform. 
            Easily submit, track, and manage your leave requests from anywhere, 
            anytime.
          </p>
          
          <div className="space-y-4 w-full max-w-md">
            <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Plane className="text-blue-600" size={24} />
              <span>Quick and Easy Leave Applications</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
              <span>Team-wide Leave Tracking</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
              <CheckCircle className="text-blue-600" size={24} />
              <span>Instant Approval Notifications</span>
            </div>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('apply-leave')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plane size={20} />
              <span>Apply for Leave</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('leave-calendar')}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>View History</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeComponent;