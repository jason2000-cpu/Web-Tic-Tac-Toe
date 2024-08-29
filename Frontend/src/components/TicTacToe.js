import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Board from './Board';

const socket = io.connect('http://localhost:3001');

const TicTacToe = ({ gameId, player }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const playerInStore = JSON.parse(localStorage.getItem('player1'));

  useEffect(() => {
    socket.emit('joinGame', gameId, playerInStore.username);

    socket.on('updateGame', (game) => {
      setBoard(game.board);
      setIsXNext(game.isXNext);
      setWinner(calculateWinner(game.board));
      setPlayer1(game.player1)
      setPlayer2(game.player2)
    });

    return () => {
      socket.off('updateGame');
    };
  }, [gameId, playerInStore]);

  const handleClick = (index) => {
    if (winner || board[index] || (isXNext && player !== 'X') || (!isXNext && player !== 'O')) {
      return;
    }

    socket.emit('makeMove', {index, gameId, player})
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null))
    socket.emit('restart', gameId);
  }

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  return (
    <div className='flex flex-col items-center justify-center h-fit'>
      <button className='border rounded-lg px-4 py-1' onClick={handleRestart}>Restart</button>
      {/* <h1>Player1: {player1}   Player2 : {player2}</h1> */}
      <Board board={board} handleClick={handleClick} />
      <div className='pt-72'>
        {winner ? <h2>Winner: {winner}</h2> : (
          <div className='flex items-center space-x-3'>
          <h2 className='text-3xl font-bold font-rubik'>Next Player:</h2>{isXNext ? <img src='/static/images/cross.png' className='w-10 h-10' alt='X' /> : <img src='/static/images/circle.png' className='w-10 h-10' alt='X' />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
