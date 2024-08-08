"use client"
import React, { useState } from 'react';
import NFTGallery from '../ui/nftgallery';

const NFTScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'user'>('all');

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-4xl">
                <div className="flex border-b border-gray-300 mb-4">
                    <button
                        className={`py-2 px-4 text-lg font-medium ${activeTab === 'all' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All NFTs
                    </button>
                    <button
                        className={`py-2 px-4 text-lg font-medium ${activeTab === 'user' ? 'border-b-2 border-blue-500' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('user')}
                    >
                        Your NFTs
                    </button>
                </div>
                <NFTGallery filter={activeTab} />
            </div>
        </div>
    );
};

export default NFTScreen;
