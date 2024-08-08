import React, { useState } from 'react';

const MintForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleMint = () => {
    // Logic to mint NFT
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <label className="flex flex-col">
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="flex flex-col">
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="mt-2 p-2 border border-gray-300 rounded"
        />
      </label>
      <button 
        onClick={handleMint} 
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Mint
      </button>
    </div>
  );
};

export default MintForm;
