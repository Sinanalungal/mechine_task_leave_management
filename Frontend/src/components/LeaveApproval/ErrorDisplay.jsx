import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorDisplay = ({ message }) => (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Leave Requests
        </h2>
        <p className="text-gray-600">{message}</p>
    </div>
);

export default ErrorDisplay;