import React, { Children, createContext, useContext, useState, } from "react";


const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ Children }) => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    const value = {
        player1,
        player2
    }

    return (
        <GameContext.Provider value={value}>
            {Children}
        </GameContext.Provider>
    )
}