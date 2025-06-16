import React, { useEffect, useState } from 'react';
import './GameBoard.css'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const [isXTurn, setIsXTurn] = useState(true); // true = X, false = O
    const [isFull, setIsFull] = useState(false);


    useEffect(
        () => {
            if (isBoardFull()) {
                setIsFull(true);
                console.log('Board is full!');
            }

        }, [gameBoard]
    );

    const isCellSelected = (x, y) => {
        return gameBoard[x][y] !== null;
    }

    const isBoardFull = () => {
        return gameBoard.every((rowItem) => {
            return rowItem.every(
                (colItem) => {
                    return colItem != null;
                }
            );
        })
    }

    const checkWiner = (gameBoard2d) => {

    }

    const handleOnClick = (rowIndex, colIndex) => {

        // if nếu đã chọn thì không được chọn nữa
        if (isCellSelected(rowIndex, colIndex) || isFull) return;

        // cell chưa chọn khi click sẽ chuyển đổi thành X, O dựa vào isXturn
        // update lại gameBoard => render lại UI
        setGameBoard(updatedBoard(rowIndex, colIndex));

        setIsXTurn(!isXTurn); // đổi lượt
    }

    // mục đích update lại mảng
    const updatedBoard = (x, y) => {
        // lặp qua mảng 
        return gameBoard.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
                // chỉ đổi tại vị trí được click
                if (x === rowIndex && y === colIndex) {
                    return isXTurn ? 'X' : 'O';
                }
                return col;
            })
        })
    }


    return (
        <div>
            {gameBoard.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className='board-row'>
                        {row.map((col, colIndex) => {
                            return (
                                <button key={colIndex} className="board-cell" onClick={() => handleOnClick(rowIndex, colIndex)}>
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
