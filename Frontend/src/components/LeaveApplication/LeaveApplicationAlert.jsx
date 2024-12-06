import React from "react";
import {
  AlertCircle,
} from "lucide-react";


export const LeaveApplicationAlert = () => (
    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg flex items-center text-sm">
      <AlertCircle className="mr-2 sm:mr-3 text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />
      <p className="text-blue-800 text-xs sm:text-sm">
        Ensure all details are accurate. Your leave request will be
        reviewed by your manager.
      </p>
    </div>
  );