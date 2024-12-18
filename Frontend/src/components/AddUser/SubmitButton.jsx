import axios from 'axios';
import React from 'react';


export const SubmitButton = ({ 
  children, 
  isDisabled = false 
}) => {
  return (
    <div className="col-span-2">
      <button
        type="submit"
        disabled={isDisabled}
        className={`
          w-full p-4 
          bg-gradient-to-r from-purple-700 to-pink-500 
          text-white font-semibold rounded-lg 
          shadow-md transform transition-transform 
          duration-300 
          ${isDisabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-xl'
          }
        `}
      >
        {children}
      </button>
    </div>
  );
};

const handleLogin = ()=> {
  try {
    const response = axios.get('http,odn')
    return response.data
  } catch (error) {
    console.log(response.data)
    throw Error
  }
}