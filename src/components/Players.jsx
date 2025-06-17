import React, { useState } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';


export default function Players({ players }) {

    const [activePlayerIndex, setActivePlayerIndex] = useState(0); // 0: player 1, 1: player 2

    const switchPlayer = () => {
        setActivePlayerIndex(
            // 0 thì chuyển sang 1, 1 chuyển sang 0
            (prevIndex) => {
                return prevIndex === 0 ? 1 : 0
            }
        )
    }

    return (
        <div id="game-container">
            <ol id="players">
                {
                    players.map((player, index) => {
                        return <Player
                            key={player.name}
                            initialPlayer={player}
                            isActive={activePlayerIndex === index} // nếu index là 0 thì activePlayer phải true
                        />
                    })
                }
            </ol>
            <GameBoard onSelectSquare={switchPlayer} />
        </div>
    );
}
