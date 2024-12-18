import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ 
                repeat: Infinity, 
                duration: 1, 
                ease: "linear" 
            }}
        >
            <Clock className="w-12 h-12 text-slate-800" />
        </motion.div>
    </div>
);

export default LoadingSpinner;