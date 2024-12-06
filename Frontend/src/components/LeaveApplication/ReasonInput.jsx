import React from "react";
import {
  User,
} from "lucide-react";


export const ReasonInput = ({ value, onChange }) => (
    <div>
      <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
        <User className="mr-2 text-amber-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
        Reason for Leave
      </label>
      <textarea
        name="reason"
        value={value}
        onChange={onChange}
        className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm sm:text-base"
        placeholder="Provide a brief explanation"
      />
    </div>
  );