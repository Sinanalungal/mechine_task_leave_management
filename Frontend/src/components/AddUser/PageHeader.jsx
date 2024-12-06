import React from 'react';
import { UserPlus } from 'lucide-react';



export const PageHeader= ({ title }) => {
  return (
    <h1 className="text-2xl my-5 sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text font-roboto bg-gradient-to-r from-purple-600 to-blue-600 flex items-center">
      <UserPlus color='#6B46C1' size={30} className="mr-2 sm:mr-4" /> 
      {title}
    </h1>
  );
};