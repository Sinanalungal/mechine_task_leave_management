import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Calendar, Info } from "lucide-react";

const LeaveRequestsTable = ({
  filteredRequests,
  handleLeaveAction,
  setSelectedRequest,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="bg-white shadow-2xl overflow-x-auto rounded-3xl overflow-hidden border-2 border-purple-50"
  >
    <table className="w-full min-w-[800px]">
      <thead className="bg-slate-700 border-b-2 border-purple-200">
        <tr>
          {[
            "Employee",
            "Leave Type",
            "Dates",
            "Reason",
            "Department",
            "Status",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              className="p-4 text-left text-xs uppercase tracking-wider text-white font-bold"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {filteredRequests.map((request) => (
            <motion.tr
              key={request.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="border-b hover:bg-purple-50 group"
            >
              <td className="p-4 flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full mr-4 flex items-center justify-center text-lg sm:text-xl text-gray-700 font-bold">
                  {request?.employee?.profile_picture ??
                    request?.employee?.first_name?.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-black text-sm sm:text-base">
                  {(
                    request?.employee?.first_name +
                    " " +
                    request?.employee?.last_name
                  ).toLocaleUpperCase()}
                </span>
              </td>
              <td className="p-4 text-xs sm:text-sm text-gray-600">
                {request?.leave_type?.name}
              </td>
              <td className="p-4 text-xs sm:text-sm">
                <div className="flex items-center text-gray-700">
                  <Calendar className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  {request.start_date} - {request.end_date}
                </div>
              </td>
              <td className="p-4 text-xs sm:text-sm text-gray-600">
                {request.reason}
              </td>
              <td className="p-4 text-xs sm:text-sm text-gray-500">
                {request?.employee?.department}
              </td>
              <td className="p-4">
                <span
                  className={`
                                                px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold
                                                ${
                                                  request.status === "pending"
                                                    ? "bg-gradient-to-r from-orange-300 to-orange-500 text-white"
                                                    : request.status ===
                                                      "approved"
                                                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                                                    : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                                                }
                                            `}
                >
                  {request.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {request.status === "pending" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLeaveAction(request.id, "approve")}
                        className="text-green-500 hover:bg-green-100 p-2 rounded-full"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLeaveAction(request.id, "reject")}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                      >
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedRequest(request)}
                    className="text-gray-500 hover:bg-purple-100 p-2 rounded-full"
                  >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </table>
  </motion.div>
);

export default LeaveRequestsTable;
