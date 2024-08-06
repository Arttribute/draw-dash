import React from 'react';
import LeaderboardTable from '../ui/leaderboardtable';

const Leaderboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl mb-4">Leaderboard</h1>
            <LeaderboardTable />
        </div>
    );
};

export default Leaderboard;
