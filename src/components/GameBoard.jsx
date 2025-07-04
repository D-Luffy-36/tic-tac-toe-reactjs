import React, { useEffect, useState } from 'react';
import './GameBoard.css'


export default function GameBoard({ gameBoard, onSelectSquare, }) {
    return (
        <div>
            {gameBoard.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='board-row'>
                        {row.map((col, colIndex) => {
                            return (
                                <button key={`${rowIndex}-${colIndex}`} className="board-cell"
                                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                                    disabled={gameBoard[rowIndex][colIndex]}
                                >
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
