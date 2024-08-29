import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

function usePlayerHook() {
    const [players, setPlayers] = useState([]);


    useEffect(() => {
        axios.get(`${BASE_URL}/players`)
        .then((data) => {
            setPlayers(data);
        })
        .catch((err => {
            console.log('Error While Fetching Players', err)
        })) 
    }, [])

    async function createUser(formData) {
        const response = await axios.post(`${BASE_URL}/players`, formData)
        console.log('Form submitted Hook:', formData);
        console.log(response);
        
        return response;
    }
    return {
        players,
        createUser,
    }
}


export default usePlayerHook;