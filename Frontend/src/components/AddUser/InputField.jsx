import React from 'react';


export const InputField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    error,
    placeholder
  }) => {
    return (
      <div>
        <label className="block text-purple-700 font-semibold mb-2">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full p-3 border rounded-lg 
            transition-all ease-in-out duration-300 
            ${error 
              ? 'border-red-500 shadow-lg shadow-red-100' 
              : 'border-purple-200'
            }
          `}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };


