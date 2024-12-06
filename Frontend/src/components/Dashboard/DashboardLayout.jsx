import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = ({ children }) => {
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-white font-roboto text-gray-900 p-4 sm:p-6 lg:p-10">
            
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="container mx-auto max-w-7xl"
            >
                <DashboardHeader 
                    title="Leave Dashboard"
                    subtitle="Manage your team's time off efficiently"
                    
                />

                {children}
            </motion.div>
        </div>
    );
};

export default DashboardLayout;