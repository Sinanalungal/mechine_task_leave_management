import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
} from "lucide-react";


export const SubmitButton = ({ isSubmitting, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={isSubmitting}
      className="w-full bg-indigo-600 text-white p-2 sm:p-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center text-sm sm:text-base disabled:opacity-50"
    >
      {isSubmitting ? 'Submitting...' : 'Submit Leave Application'}
      <ArrowUpRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
    </motion.button>
  );