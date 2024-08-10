// components/ImageDisplay.tsx
import React from 'react';
import Image from 'next/image';

type GameInfo = {
    title: string;
    author: string;
    imageUrl: string;
};

type ImageDisplayProps = {
    games: GameInfo[];
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ games }) => {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {games.map((game, index) => (
                    <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                        <Image 
                            src={game.imageUrl} 
                            alt={game.title} 
                            width={500} 
                            height={300} 
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h5 className="text-lg font-bold">{game.title}</h5>
                            <p className="text-sm text-gray-500">{game.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageDisplay;
