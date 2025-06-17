import React, { useState, useEffect } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';
import Log from './Log';



export default function Players({ players }) {

    const SIZE = 3;
    // 1 nguồn dữ liệu: mảng lịch sử lượt đi
    const [gameTurns, setGameTurns] = useState([
        // { square: [0, 0], player: 'X' },  // lượt 1: X chọn ô hàng 0, cột 0
        // { square: [1, 2], player: 'O' },  // lượt 2: O chọn ô hàng 1, cột 2
        // { square: [2, 1], player: 'X' },  // lượt 3: X chọn ô hàng 2, cột 1
    ]); // mảng các lượt đi người chơi đã thực hiện
    const [isXTurn, setIsXTurn] = useState(true);     // dấu hiệu lượt X hay O

    // =====================
    // 1) DERIVE gameBoard từ gameTurns
    // =====================
    const deriveBoard = () => {

        const board = Array.from({ length: SIZE }, () =>
            Array.from({ length: SIZE }, () => null)
        );

        for (const { square: [r, c], player } of gameTurns) {
            board[r][c] = player; // Đặt X hoặc O theo lượt đã đi
        }

        return board;
    }
    const gameBoard = deriveBoard();

    // =====================
    // 2) isBoardFull: kiểm tra hết ô còn null hay chưa
    // =====================
    const isBoardFull = () =>
        gameBoard.every(row => row.every(cell => cell !== null));

    const checkWinner = (gameBoard2d) => {
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
                if (cell != gameBoard2d[i][size - 1 - i]) {
                    allMatch = false;
                    break
                }
            }
            if (allMatch) return cell
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isBoardFull()) {
                alert('Hòa! Bàn đã đầy.');
                resetGame();
                return;
            }

            const winner = checkWinner(gameBoard);
            if (winner) {
                alert(`Người thắng: ${winner}`);
                resetGame();
            }
        }, 100); // delay 100ms để React vẽ xong bàn cờ

        return () => clearTimeout(timer); // cleanup khi component unmount hoặc rerender
    }, [gameTurns]);


    const handleSelectSquare = (row, col) => {

        // 1) Chặn click ô đã có người đánh
        // duyệt check xem vị trí đó đã có trong gameTurn chưa nếu có thì return;
        // trong mảng turn check square chứa row và col hay không
        if (gameTurns.some(t => t.square[0] === row && t.square[1] === col)) return;

        console.log(`[${row}, ${col}]`);

        // 2) Xác định người chơi hiện tại
        const player = isXTurn ? "X" : "O";

        // 3) Thêm lượt đi mới vào mảng
        setGameTurns(pre => [...pre, { square: [row, col], player: player }]);

        // chuyển lượt chơi
        switchPlayer();
    }

    const switchPlayer = () => {
        setIsXTurn(pre => !pre);
    }

    // =====================
    // 6) Reset lại trò chơi
    // =====================
    function resetGame() {
        setGameTurns([]);
        setIsXTurn(true);
    }


    return (
        <>
            <div id="game-container">
                <ol id="players">
                    {
                        players.map((player, index) => {
                            return <Player
                                key={player.name}
                                initialPlayer={player}
                                isActive={index === (isXTurn ? 0 : 1)}
                            />
                        })
                    }
                </ol>
                <GameBoard gameTurns={gameTurns} onSelectSquare={handleSelectSquare} />
            </div>

            <Log gameTurns={gameTurns} />
        </>

    );
}


