import React, { useState } from 'react';
import Player from './Player'


export default function Players({ players, onEditPlayer }) {

    return (
        <div id="game-container">
            <ol id="players">
                {
                    players.map((player, index) => {
                        return <Player
                            key={player.name}
                            player={player}
                            index={index} // good
                            onEditPlayer={onEditPlayer}
                        />
                    })
                }
            </ol>
            GAME BOARD
        </div>
    );
}
