import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import TicTacToe from "../components/TicTacToe";


const socket = io.connect('http://localhost:3001');

function Home() {
    const [player, setPlayer] = useState(null);
    const [gameId, setGameId] = useState('gam1');
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const playerInStore = JSON.parse(localStorage.getItem('player1'));

    useEffect(() => {
    
        socket.on('updateGame', (game) => {
          setPlayer1(game.player1)
          setPlayer2(game.player2)
        });
    
        return () => {
          socket.off('updateGame');
        };
      }, [gameId, playerInStore]);


    const handleJoin = () => {
        if (!player) {
            setPlayer('X');
        } else {
            setPlayer('O');
        }
        socket.emit('joinGame', gameId, playerInStore.username);
    }
    return (
        <div className="flex">
            <div className="w-1/2">
                <img src="/static/images/vanguard.png" alt="logo" className="w-full" />
                { !player ? (
                    <div className="h-1/2 items-center  flex justify-center">
                        <button 
                            onClick={handleJoin}
                            className="p-2 rounded-lg font-bold text-xl bg-[#ef4c018e]"
                            >Join Game</button>
                    </div>
                ) : (
                    <div className=" space-y-16">
                    <div className="flex justify-center items-center space-x-3">
                        <h1 className="font-bold text-5xl">{player1}</h1>
                        <span className="text-2xl ">Vs</span>
                        <h1 className="font-bold text-5xl">{player2}</h1>
                    </div>
                    <div className="flex justify-center space-x-28 font-bold items-center">
                            <img src="/static/images/cross.png" alt='X' className="w-32 h-32" /> 
                            <img src="/static/images/circle.png" alt='O' className="w-32 h-32" />
                    </div>
                    <div className="flex justify-center space-x-10">
                        <span className="flex justify-center items-center">
                            <img src="/static/images/wins.png" className="w-10 h-10" alt="wins" />
                            <span className="text-xl">Wins : <span>{playerInStore.wins}</span> </span>
                        </span>
                        <span className="flex justify-center items-center">
                            <img src="/static/images/loss.png" className="w-10 h-10" alt="loss" />
                            <span className="text-xl">Loss : <span>{playerInStore.losses}</span> </span>
                        </span>
                    </div>
                </div>
                )}
            </div>
            <div className="w-1/2 space-y-24">
                <div className="flex justify-end mr-6">
                    <Link  to={'/leaderboard'} className="text-xl">Leaderboard &gt;</Link>
                </div>
                <TicTacToe gameId={gameId} player={player} />
            </div>
        </div>
    )
}

export default Home;