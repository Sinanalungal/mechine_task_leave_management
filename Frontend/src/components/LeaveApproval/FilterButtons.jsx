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
            activeClass: 'bg-slate-700 text-white',
            inactiveClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        },
        { 
            label: 'Pending', 
            value: 'pending', 
            icon: Clock,
            activeClass: 'bg-slate-700 text-white',
            inactiveClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        },
        { 
            label: 'Approved', 
            value: 'approved', 
            icon: CheckCircle,
            activeClass: 'bg-slate-700 text-white',
            inactiveClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        },
        { 
            label: 'Rejected', 
            value: 'rejected', 
            icon: XCircle,
            activeClass: 'bg-slate-700 text-white',
            inactiveClass: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                        border border-gray-200 shadow-sm
                        ${filter === btn.value 
                            ? btn.activeClass 
                            : btn.inactiveClass}
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