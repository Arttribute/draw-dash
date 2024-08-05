import React from 'react';

interface NFTGalleryProps {
  filter: 'all' | 'user';
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ filter }) => {
  // Dummy data for demonstration purposes
  const allNFTs = [
    { id: 1, image: '/nft-placeholder.png', title: 'NFT 1' },
    { id: 2, image: '/nft-placeholder.png', title: 'NFT 2' },
  ];

  const userNFTs = [
    { id: 1, image: '/nft-placeholder.png', title: 'User NFT 1' },
  ];

  // Choose which NFTs to display based on the active tab
  const nfts = filter === 'all' ? allNFTs : userNFTs;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {nfts.map((nft) => (
        <div key={nft.id} className="border border-gray-300 rounded p-4">
          <img src={nft.image} alt={nft.title} className="w-full h-auto mb-2" />
          <h3 className="text-lg">{nft.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;
