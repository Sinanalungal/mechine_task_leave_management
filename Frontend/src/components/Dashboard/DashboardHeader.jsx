import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader = ({ title, subtitle}) => {
    return (
     <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-10 space-y-4 md:space-y-0">
        <div className="text-center md:text-left w-full">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 mb-2">
                    {title}
                </h1>
                <p className="text-gray-500/80 font-medium text-base sm:text-lg">
                    {subtitle}
                </p>
            </div>
            {/*  */}
        </div>
    );
};

export default DashboardHeader;