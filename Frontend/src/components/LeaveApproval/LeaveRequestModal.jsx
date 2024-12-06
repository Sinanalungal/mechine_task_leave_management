import React from 'react';
import { motion } from 'framer-motion';


const LeaveRequestModal = ({ selectedRequest, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full mr-4 flex items-center justify-center text-3xl text-indigo-600 font-bold">
          {selectedRequest?.employee?.first_name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-2xl font-bold">
            {`Employee Name: ${
              selectedRequest?.employee?.first_name +
              " " +
              selectedRequest?.employee?.last_name
            }`}
          </h3>
          <p className="text-gray-500">Leave Details</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Leave Type:</span>
          <span className="font-semibold">
            {selectedRequest.leave_type === 1 ? "Annual Leave" : "Sick Leave"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Date Range:</span>
          <span className="font-semibold">
            {selectedRequest.start_date} to {selectedRequest.end_date}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-semibold">{selectedRequest.duration} days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reason:</span>
          <span className="font-semibold">{selectedRequest.reason}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span
            className={`
                                            px-3 py-1 rounded-full text-xs font-bold
                                            ${
                                              selectedRequest.status ===
                                              "pending"
                                                ? "bg-amber-100 text-amber-800"
                                                : selectedRequest.status ===
                                                  "approved"
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-rose-100 text-rose-800"
                                            }
                                        `}
          >
            {selectedRequest.status.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default LeaveRequestModal;