import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { LogOut, X } from "lucide-react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirmLogout }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Full Page Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] font-roboto bg-black/50 backdrop-blur-sm"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="
          fixed inset-0 z-[10000] 
          flex items-center justify-center 
          pointer-events-none
        "
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="
            bg-white border border-gray-200 rounded-3xl shadow-2xl 
            max-w-md w-full mx-4 overflow-hidden
            relative pointer-events-auto
            transform transition-all duration-300
          "
        >
          {/* Modal Header */}
          <div
            className="
              bg-gradient-to-r from-slate-900 font-roboto to-gray-700 
              text-white p-6 relative
            "
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <h2 className="text-2xl font-bold flex items-center">
                <LogOut className="mr-3 w-7 h-7 text-white" />
                Exit Application
              </h2>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="
                  bg-white/20 hover:bg-white/30 
                  rounded-full p-2 
                  transition-all duration-300
                  flex items-center justify-center
                "
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            <p
              className="
                text-gray-600 font-roboto text-base 
                leading-relaxed text-center
                px-4
              "
            >
              Are you sure you want to log out? You'll need to sign in again to
              access your account.
            </p>

            {/* Action Buttons */}
            <div className="flex font-roboto space-x-4 px-4 pb-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="
                  flex-1 py-3 px-4 
                  border border-gray-300 
                  rounded-lg 
                  text-gray-700 
                  hover:bg-gray-50 
                  transition-colors
                  font-medium
                "
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirmLogout}
                className="
                  flex-1 py-3 px-4 
                  bg-red-600 hover:bg-red-700 
                  text-white 
                  rounded-lg 
                  transition-all
                  font-medium
                  shadow-md hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                "
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById("modal")
  );
};

export default LogoutConfirmationModal;