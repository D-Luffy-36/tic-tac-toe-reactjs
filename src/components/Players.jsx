import React, { useState, useEffect, useMemo } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';
import GameOver from './GameOver';
import Log from './Log';


export default function Players() {

    const [players, setPlayers] = useState([
        { name: 'player 1', symbol: 'X' },
        { name: 'player 2', symbol: 'O' },
    ]);

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevPlayers) =>
            prevPlayers.map((el) => {
                if (el.symbol === symbol) {
                    return { ...el, name: newName }; // ✅ clone đúng
                }
                return el;
            })
        );
    };


    const SIZE = 3;
    // 1 nguồn dữ liệu: mảng lịch sử lượt đi
    const [gameTurns, setGameTurns] = useState([
        // { square: [0, 0], player: 'X' },  // lượt 1: X chọn ô hàng 0, cột 0
        // { square: [1, 2], player: 'O' },  // lượt 2: O chọn ô hàng 1, cột 2
        // { square: [2, 1], player: 'X' },  // lượt 3: X chọn ô hàng 2, cột 1
    ]); // mảng các lượt đi người chơi đã thực hiện

    const [winner, setWinner] = useState(null);
    const hasDraw = !winner && gameTurns.length === SIZE * SIZE;


    function deriveActivePlayer(turns) {
        if (turns.length === 0) return 'X'; // X luôn đi trước
        const lastPlayer = turns[turns.length - 1].player;
        return lastPlayer === 'X' ? 'O' : 'X';
    }

    const activePlayer = deriveActivePlayer(gameTurns);

    const isXTurn = activePlayer === 'X';

    // =====================
    // 1) DERIVE gameBoard từ gameTurns
    // =====================
    // Derive gameBoard từ gameTurns với useMemo
    // ==== 1) DERIVE gameBoard từ gameTurns ở đây ====
    const gameBoard = useMemo(() => {
        const board = Array.from({ length: SIZE }, () =>
            Array.from({ length: SIZE }, () => null)
        );
        for (const turn of gameTurns) {
            const { square, player } = turn;
            const [r, c] = square;
            board[r][c] = player;
        }
        return board;
    }, [gameTurns]);;


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

        // duyệt chéo phụ
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
        // hòa
        return null;
    }

    // bug
    useEffect(() => {
        const timer = setTimeout(() => {
            const result = checkWinner(gameBoard);
            if (result) {
                const winnerPlayer = players.find(player => player.symbol === result);
                // Lấy tên người thắng (nếu tìm thấy)
                const playerName = winnerPlayer ? winnerPlayer.name : null;
                setWinner(playerName);
            }
        }, 100);

        return () => clearTimeout(timer);
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
    }

    // =====================
    // 6) Reset lại trò chơi
    // =====================
    function resetGame() {
        setGameTurns([]);
        setWinner(null);
    }


    return (
        <>
            <div id="game-container">
                <ol id="players">
                    {
                        players.map((player, index) => {
                            return <Player
                                key={player.symbol}
                                initialPlayer={player}
                                onChange={(newName) => {
                                    return handlePlayerNameChange(player.symbol, newName)
                                }}
                                isActive={activePlayer === player.symbol}
                            />
                        })
                    }
                </ol>
                <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} />
            </div>

            <Log gameTurns={gameTurns} />

            {(winner || hasDraw) && (
                <GameOver winner={winner} onRestart={resetGame} />
            )}
        </>

    );
}


