import React from 'react';

const ImageComparison: React.FC = () => {
  return (
    <div className="flex justify-around w-full">
      <div className="flex-1 p-2">
        <img src="/ai-image-placeholder.png" alt="AI" className="w-full h-auto" />
      </div>
      <div className="flex-1 p-2">
        <img src="/user-image-placeholder.png" alt="User" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default ImageComparison;
