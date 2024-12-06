import React from "react";
import {
  Mail,
} from "lucide-react";


export const ContactDetailsInput = ({ value, onChange }) => (
    <div>
      <label className="flex items-center mb-2 text-gray-700 font-semibold text-sm sm:text-base">
        <Mail className="mr-2 text-blue-600 w-4 h-4 sm:w-5 sm:h-5" />{" "}
        Contact During Leave
      </label>
      <input
        type="text"
        name="contact_details"
        value={value}
        onChange={onChange}
        className="w-full p-2 sm:p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
        placeholder="Phone or email for emergency contact"
      />
    </div>
  );
  
