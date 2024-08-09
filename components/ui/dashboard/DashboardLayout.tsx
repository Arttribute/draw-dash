// components/DashboardLayout.tsx
import React, { useState } from 'react';
import AssetsList from './AssetsList';

const DashboardLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block md:w-1/4 bg-white p-4 shadow-lg`}>
        <h2 className="font-semibold text-xl mb-4">Navigation</h2>
        <ul>
          <li className="my-2">Home</li>
          <li className="my-2">Profile</li>
          <li className="my-2">Settings</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardLayout;
