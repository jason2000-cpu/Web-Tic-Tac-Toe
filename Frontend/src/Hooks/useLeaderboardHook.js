import axios from "axios";
import React, {useState, useEffect} from "react";

const BASE_URL = 'http://localhost:3001';

function useLeaderboardHook() {
    const [leaderboard, setLeaderboard] = useState([]);


    useEffect(() => {
        axios.get(`${BASE_URL}/leaderboard`)
        .then((data) => {
            setLeaderboard(data.data);
        })
    },[])


    return {
        leaderboard,
    }
}

export default useLeaderboardHook;