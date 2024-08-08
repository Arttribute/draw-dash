import React from 'react';
import { Button } from '../ui/button';
import MintForm from '../ui/mintform';

const MintScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl mb-4">Mint Your Drawing</h1>
            <MintForm />
            <Button className="mt-4">View Leaderboard</Button>
        </div>
    );
};

export default MintScreen;
