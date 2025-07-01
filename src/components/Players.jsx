import React, { useState, useEffect, useMemo } from 'react';
import Player from './Player';
import GameBoard from './GameBoard';
import GameOver from './GameOver';
import Log from './Log';

import { SIZE, PLAYERS } from '../constants';
import { deriveActivePlayer, checkWinner } from '../helper';


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

    // const SIZE = 3;
    // 1 nguồn dữ liệu: mảng lịch sử lượt đi
    const [gameTurns, setGameTurns] = useState([
        // { square: [0, 0], player: 'X' },  // lượt 1: X chọn ô hàng 0, cột 0
        // { square: [1, 2], player: 'O' },  // lượt 2: O chọn ô hàng 1, cột 2
        // { square: [2, 1], player: 'X' },  // lượt 3: X chọn ô hàng 2, cột 1
    ]); // mảng các lượt đi người chơi đã thực hiện

    const [winner, setWinner] = useState(null);

    const hasDraw = !winner && gameTurns.length === SIZE * SIZE;

    const activePlayer = deriveActivePlayer(gameTurns);

    const isXTurn = activePlayer === 'X';

    // =====================
    // 1) DERIVE gameBoard từ gameTurns
    // =====================
    // Derive gameBoard từ gameTurns với useMemo
    // ==== 1) DERIVE gameBoard từ gameTurns ở đây ====
    const gameBoard = useMemo(() => {
        return deriveGameBoard(gameTurns, SIZE);
    }, [gameTurns]);;


    // bug
    useEffect(() => {
        const timer = setTimeout(() => {
            const result = checkWinner(gameBoard);
            if (result) {
                const winnerPlayer = players.find(player => player.symbol === result); // object 
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


