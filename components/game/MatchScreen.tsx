import React from 'react';
import { Button } from '../ui/button';
import ImageComparison from '../ui/imagecomparison';


const MatchScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full mb-4">
                <ImageComparison />
            </div>
            <Button className="mt-4">Mint Drawing</Button>
        </div>
    );
};

export default MatchScreen;
