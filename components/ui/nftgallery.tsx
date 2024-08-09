import React, { useState } from 'react';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface NFTGalleryProps {
  filter: 'all' | 'user';
}

interface NFT {
  id: number;
  image: string;
  title: string;
  owner?: string;  
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ filter }) => {
  // Dummy data for demonstration purposes
  const allNFTs = [
    { id: 1, image: '/assets/cat4.jpeg', title: 'NFT 1', owner: 'Mercy' },
    { id: 2, image: '/assets/cat2.jpeg', title: 'NFT 2', owner: 'Jada' },
    { id: 3, image: '/assets/cat3.jpeg', title: 'NFT 3', owner: 'Mark' },
    { id: 4, image: '/assets/cat4.jpeg', title: 'NFT 4', owner: 'Jonah' },
    { id: 5, image: '/assets/cat2.jpeg', title: 'NFT 5', owner: 'Bezos' },
  ];

  const userNFTs = [
    { id: 1, image: '/assets/cat4.jpeg', title: 'User NFT 1', owner: 'You' },
  ];

  //filter NFTs to display based on the active tab
  const nfts = filter === 'all' ? allNFTs : userNFTs;

  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {nfts.map((nft) => (
        <Dialog key={nft.id} onOpenChange={(open) => open ? setSelectedNFT(nft) : setSelectedNFT(null)}>
        <DialogTrigger asChild>
          <div className="cursor-pointer border border-gray-300 rounded-lg p-4 shadow-lg overflow-hidden">
            <Image src={nft.image} alt={nft.title} width={500} height={500} className="w-full h-auto object-cover mb-2" />
            <h3 className="text-lg font-semibold">{nft.title}</h3>
            {nft.owner && <p className="text-sm text-gray-600">by {nft.owner}</p>}
          </div>
        </DialogTrigger>
        <DialogContent>
          {selectedNFT && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedNFT.title}</DialogTitle>
                {selectedNFT.owner && <DialogDescription>Owned by {selectedNFT.owner}</DialogDescription>}
              </DialogHeader>
              <Image src={selectedNFT.image} alt={selectedNFT.title} width={500} height={500} className="w-full h-auto mt-4 rounded-lg" />
            </>
          )}
        </DialogContent>
      </Dialog>
      ))}
    </div>
  );
};

export default NFTGallery;
