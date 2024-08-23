import React, { useState } from 'react';

function LeaderBoard() {
    const [players, setPlayers] = useState([
        { rank: 1, username: 'David', score: 100 },
        { rank: 2, username: 'John', score: 90 },
        { rank: 3, username: 'Jane', score: 80 }
    ]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-red-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4 text-white">Leader Board</h1>
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="py-3 px-4 text-left">Rank</th>
                        <th className="py-3 px-4 text-left">Username</th>
                        <th className="py-3 px-4 text-left">Score</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {players.map(player => (
                        <tr key={player.rank} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4">{player.rank}</td>
                            <td className="py-2 px-4">{player.username}</td>
                            <td className="py-2 px-4">{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderBoard;
