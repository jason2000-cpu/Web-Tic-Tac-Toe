import useLeaderboardHook from "../Hooks/useLeaderboardHook";

// const leaderboardData = [
//     {
//         userId: 1,
//         username: 'Ann Master',
//         points: 1530,
//         loss: 4,
//         wins: 52
//     },
//     {
//         userId: 2,
//         username: 'Joe Master',
//         points: 1130,
//         loss: 8,
//         wins: 48
//     },
//     {
//         userId: 3,
//         username: 'Poke Master',
//         points: 930,
//         loss: 10,
//         wins: 30
//     },
//     {
//         userId: 4,
//         username: 'Davi Master',
//         points: 730,
//         loss: 14,
//         wins: 28
//     }
// ]

const LeaderboardTable = () => {

  const { leaderboard } = useLeaderboardHook();

  console.log( leaderboard)

  return (
    <div className="overflow-x-auto mx-32">
      <table className="min-w-full">
        <thead>
          <tr className="">
            <th className="py-2 px-8 border-b-8 text-left w-1/3">Player</th>
            <th className="py-2 px-8 border-b-8 text-left w-1/3">Rank</th>
            <th className="py-2 px-8 border-b-8 text-left w-1/3">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.id} className={index % 2 === 0 ? "" : ""}>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center space-x-4">
                  <span className="rounded-full border-red-500">
                    <img src={`/static/images/user${index + 1}.jpg`} className="rounded-full w-16 h-16" alt={player.username} />
                  </span>
                  <span>{player.username}</span>
                </div>
              </td>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b text-xl font-bold">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
