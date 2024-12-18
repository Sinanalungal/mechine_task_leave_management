import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    MoreVertical
} from 'lucide-react';


const LeaveApprovalsHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => (
    <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="flex justify-between items-center mb-8"
    >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text font-poppins bg-gradient-to-r from-slate-700 to-slate-600 flex items-center">
            <Users color='black' size={30} className="mr-2 sm:mr-4" /> 
            Leave Approvals
        </h1>
        <div className="lg:hidden">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-purple-600 p-2"
            >
                <MoreVertical />
            </motion.button>
        </div>
    </motion.div>
);

export default LeaveApprovalsHeader;