import React, { useEffect, useState } from 'react';
import './GameBoard.css'

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({ onSelectSquare }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const [isXTurn, setIsXTurn] = useState(true); // true = X, false = O
    const [isFull, setIsFull] = useState(false);


    useEffect(() => {
        if (isBoardFull()) {
            setIsFull(true);
            console.log('Board is full!');
        }
        let playerWin = checkWiner(gameBoard);
        if (playerWin) {
            // Delay 10ms để React kịp render ô cuối
            setTimeout(() => {
                alert(`The winner is: ${playerWin}`);
                setGameBoard(initialGameBoard);
                onSelectSquare();
            }, 10);
        }
    }, [gameBoard]);


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
        const size = gameBoard2d.length;
        // Duyệt hàng ngang
        for (let row = 0; row < size; row++) {
            // dựa vào [0, 0], [1, 0], [2, 0]... là X hay O 
            let firstCell = gameBoard2d[row][0];
            // truthy
            //  Nếu firstCell có giá trị là 'X' hoặc 'O' thì điều kiện đúng (vào trong if).
            //  Nếu firstCell là undefined, null, hoặc "" (ô trống chưa đánh gì) thì điều kiện sai
            if (firstCell && gameBoard2d[row].every((cell) => { return cell === firstCell })) {
                return firstCell; // 'X' hoặc 'O'
            }
        }

        // duyet doc
        for (let col = 0; col < size; col++) {
            // [0, 0], [0, 1], [0, 2]
            let firstCell = gameBoard2d[0][col];
            let allMatch = true;
            // Duyệt tất cả các ô còn lại ở cột này
            for (let row = 1; row < size; row++) {
                // Nếu phát hiện ô nào khác với ô đầu tiên
                if (firstCell !== gameBoard2d[row][col]) {
                    allMatch = false;
                    break; // thoát vòng lặp for (row)
                }
            }
            // Nếu tất cả các ô ở cột này giống nhau & ô đầu tiên không phải ô trống (ví dụ 'X' hoặc 'O')
            if (allMatch && firstCell) {
                return firstCell; // trả về người thắng ('X' hoặc 'O')
            }
        }

        // Duyệt chéo chính
        let firstCell = gameBoard2d[0][0];
        if (firstCell) {
            let allMatch = true;
            // kiểm tra các phần tử trên đường chéo chính
            for (let i = 1; i < size; i++) {
                if (gameBoard2d[i][i] !== firstCell) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) return firstCell;
        }


        // duyệt chéo 
        let cell = gameBoard2d[0][size - 1];
        if (cell) {
            let allMatch = true;
            for (let i = 1; i < size; i++) {
                if (cell != gameBoard[i][size - 1 - i]) {
                    allMatch = false;
                    break
                }
            }
            if (allMatch) return cell
        }
    }

    const handleOnClick = (rowIndex, colIndex) => {

        // if nếu đã chọn thì không được chọn nữa
        if (isCellSelected(rowIndex, colIndex) || isFull) return;

        // cell chưa chọn khi click sẽ chuyển đổi thành X, O dựa vào isXturn
        // update lại gameBoard => render lại UI
        setGameBoard(updatedBoard(rowIndex, colIndex));

        setIsXTurn(!isXTurn); // đổi lượt
        // chuyển active
        onSelectSquare();
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
