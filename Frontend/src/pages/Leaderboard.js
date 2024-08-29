import LeaderboardTable from "../components/LeaderboardTable";

function Leaderboard( ) {
    return (
        <div className="pt-10">
            <div className="flex justify-center items-center space-x-2">
                <span className="font-[elephant] text-6xl">Leader</span>
                <img src="/static/images/leaderCup.png" alt="learderboard cup" className="h-56 w-56" />
                <span className="font-[elephant] text-pretty text-6xl">Board</span>
            </div>
            <div className="mt-16">
                <LeaderboardTable />
            </div>
        </div>
    )
}

export default Leaderboard;