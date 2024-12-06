import React from "react";
import {
  Clock,
} from "lucide-react";

export const DateRangeSelector = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
          <Clock className="mr-2 text-emerald-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
          Start Date
        </label>
        <input
          type="date"
          name="start_date"
          value={startDate}
          onChange={onStartDateChange}
          className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm sm:text-base"
          required
        />
      </div>
      <div>
        <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
          <Clock className="mr-2 text-rose-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
          End Date
        </label>
        <input
          type="date"
          name="end_date"
          value={endDate}
          onChange={onEndDateChange}
          className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm sm:text-base"
          required
        />
      </div>
    </div>
  );
  