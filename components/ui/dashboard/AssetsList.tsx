import React from 'react';

type Asset = {
  id: number;
  name: string;
};

const assets: Asset[] = [
  { id: 1, name: 'Asset 1' },
  { id: 2, name: 'Asset 2' },
  { id: 3, name: 'Asset 3' },
];

const AssetsList: React.FC = () => {
  return (
    <div className="flex flex-col p-4">
      {assets.map((asset: Asset) => (
        <div key={asset.id} className="mb-2 bg-gray-50 border border-gray-200 p-2 rounded-md">
          <input type="checkbox" id={`checkbox-${asset.id}`} className="mr-2"/>
          <label htmlFor={`checkbox-${asset.id}`} className="text-gray-800">{asset.name}</label>
        </div>
      ))}
    </div>
  );
}

export default AssetsList;
