import React from "react";
import {
  FileText,
} from "lucide-react";


// Header Component
export const LeaveApplicationHeader = () => (
  <div className="bg-gray-700 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between">
    <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center mb-2 sm:mb-0">
      <FileText className="mr-2 sm:mr-4 w-6 h-6 sm:w-10 sm:h-10" />
      Leave Application
    </h1>
  </div>
);