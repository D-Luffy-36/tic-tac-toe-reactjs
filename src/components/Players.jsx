import React, { useState } from 'react';
import Player from './Player'
import GameBoard from './GameBoard';


export default function Players({ players }) {

    return (
        <div id="game-container">
            <ol id="players">
                {
                    players.map((player, index) => {
                        return <Player
                            key={player.name}
                            initialPlayer={player}
                        />
                    })
                }
            </ol>

            <GameBoard />
        </div>
    );
}
