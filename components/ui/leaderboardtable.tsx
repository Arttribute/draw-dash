import React from 'react';

const LeaderboardTable: React.FC = () => {
  const scores = [
    { rank: 1, name: 'User1', score: 95 },
    { rank: 2, name: 'User2', score: 90 },
    { rank: 3, name: 'User3', score: 85 },
  ];

  return (
    <table className="w-full max-w-md border border-gray-300 rounded">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Rank</th>
          <th className="p-2">Name</th>
          <th className="p-2">Score</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((entry) => (
          <tr key={entry.rank} className="border-t">
            <td className="p-2">{entry.rank}</td>
            <td className="p-2">{entry.name}</td>
            <td className="p-2">{entry.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardTable;
