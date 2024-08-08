import React from 'react';
import { Button } from '../ui/button';
import ImageComparison from '../ui/imagecomparison';

const MatchScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-6 mt-10 min-h-screen">
            {/* Container for Diagonal Cards */}
            <div className="relative w-full max-w-lg p-6 bg-white border border-gray-200 rounded shadow-lg">
                <div className="absolute inset-0 opacity-30 rounded-lg bg-slate-200"></div>
                <div className="relative z-10">
                    <div className="text-center mb-4">
                        <p className="text-xl font-semibold text-gray-800">Score: <span className="text-green-600">85%</span></p>
                    </div>
                    {/* Diagonal Image Cards */}
                    <ImageComparison />
                    {/* Score Display */}

                    {/* Mint Button */}
                    <div className='flex justify-center w-full'>
                    <Button className="mt-6 px-6 py-3">
                        Mint Drawing
                    </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default MatchScreen;
