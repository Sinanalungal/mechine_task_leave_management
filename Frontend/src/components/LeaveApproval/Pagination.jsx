import React from 'react';
import { motion } from 'framer-motion';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) => {
    return (
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center items-center space-x-4 my-4"
        >
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                           hover:bg-blue-600 transition-colors duration-300 
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            <div className="flex items-center space-x-2">
                <span className="text-gray-700">Page</span>
                <span className="font-bold text-blue-600">{currentPage}</span>
                <span className="text-gray-700">of</span>
                <span className="font-bold text-blue-600">{totalPages}</span>
            </div>

            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                           hover:bg-blue-600 transition-colors duration-300 
                           disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </motion.div>
    );
};

export default Pagination;