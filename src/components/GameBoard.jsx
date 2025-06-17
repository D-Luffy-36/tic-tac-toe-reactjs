import React, { useEffect, useState } from 'react';
import './GameBoard.css'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare, gameTurns }) {

    let gameBoard = initialGameBoard;
    for (let turn of gameTurns) {
        // { square: [0, 0], player: 'X' }, 
        let [x, y] = turn.square;
        // gán lại giá trị cho mảng
        gameBoard[x][y] = turn.player;
    }


    return (
        <div>
            {gameBoard.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='board-row'>
                        {row.map((col, colIndex) => {
                            return (
                                <button key={`${rowIndex}-${colIndex}`} className="board-cell" onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {col}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
