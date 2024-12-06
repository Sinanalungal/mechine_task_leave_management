import React from "react";
import {
  Calendar,

} from "lucide-react";



export const LeaveTypeSelector = ({ leaveTypes, value, onChange }) => (
    <div>
      <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
        <Calendar className="mr-2 text-indigo-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
        Leave Type
      </label>
      <select
        name="leave_type"
        value={value}
        onChange={onChange}
        className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm sm:text-base"
        required
      >
        <option value="">Select Leave Type</option>
        {leaveTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );