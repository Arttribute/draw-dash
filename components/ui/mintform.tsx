"use client";
import React from 'react';

interface MintFormProps {
  imageUrl: string; // URL of the user's drawing image
}

const MintForm: React.FC<MintFormProps> = ({ imageUrl }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="w-full h-80 bg-gray-100 flex items-center justify-center border border-gray-300 rounded">
        {/* Display the user's drawing image */}
        <img 
          src={imageUrl} 
          alt="User's Drawing" 
          className="max-w-full max-h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default MintForm;
