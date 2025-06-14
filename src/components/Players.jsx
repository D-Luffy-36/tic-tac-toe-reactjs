import React, { useState } from 'react';
import Player from './Player'


export default function Players({ players }) {

    return (
        <div id="game-container">
            <ol id="players">
                {
                    players.map((player, index) => {
                        return <Player
                            key={player.name}
                            player={player}
                            index={index} // good
                        />
                    })
                }
            </ol>
            GAME BOARD
        </div>
    );
}
