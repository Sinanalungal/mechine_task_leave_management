import React from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    Filter, 
} from 'lucide-react';


const FilterButtons = ({ filter, setFilter, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const filterButtons = [
        { 
            label: 'All Requests', 
            value: 'all', 
            icon: Filter,
            gradient: 'bg-gradient-to-r from-purple-500 to-blue-500'
        },
        { 
            label: 'Pending', 
            value: 'pending', 
            icon: Clock,
            gradient: 'bg-gradient-to-br from-[#ff9966] to-[#ff5e62]'
        },
        { 
            label: 'Approved', 
            value: 'approved', 
            icon: CheckCircle,
            gradient: 'bg-gradient-to-br from-[#11998e] to-[#38ef7d]'
        },
        { 
            label: 'Rejected', 
            value: 'rejected', 
            icon: XCircle,
            gradient: 'bg-gradient-to-br from-[#ff416c] to-[#ff4b2b]'
        }
    ];

    const renderFilterButtons = (mobile = false) => (
        <div className={mobile ? 'grid grid-cols-2 gap-4' : 'flex space-x-4'}>
            {filterButtons.map((btn) => (
                <motion.button
                    key={btn.value}
                    onClick={() => {
                        setFilter(btn.value);
                        if (mobile) setIsMobileMenuOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                        flex items-center ${mobile ? 'justify-center' : 'px-4 sm:px-5 py-2 sm:py-3'}
                        rounded-xl font-bold text-xs sm:text-sm transition-all
                        text-white shadow-lg hover:shadow-xl
                        ${filter === btn.value 
                            ? btn.gradient 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                    `}
                >
                    <btn.icon className={`mr-2 ${mobile ? 'w-4 h-4' : 'sm:mr-3 w-4 h-4 sm:w-5 sm:h-5'}`} />
                    {btn.label}
                </motion.button>
            ))}
        </div>
    );

    return (
        <>
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                className="hidden lg:flex mb-8"
            >
                {renderFilterButtons()}
            </motion.div>

            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden mb-6 overflow-hidden"
                >
                    {renderFilterButtons(true)}
                </motion.div>
            )}
        </>
    );
};

export default FilterButtons;