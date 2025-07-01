export function deriveActivePlayer(turns) {
    if (turns.length === 0) return 'X'; // X luôn đi trước
    const lastPlayer = turns[turns.length - 1].player;
    return lastPlayer === 'X' ? 'O' : 'X';
}

export function checkWinner(gameBoard2d) {
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

// =====================
// 2) isBoardFull: kiểm tra hết ô còn null hay chưa
// =====================
const isBoardFull = (gameBoard) =>
    gameBoard.every(row => row.every(cell => cell !== null));


/**
 * Tạo bảng gameBoard 2D từ danh sách lượt chơi (turns)
 * 
 * @param {Array} turns - Mảng các lượt đi, mỗi lượt có { square: [row, col], player: 'X' | 'O' }
 * @param {number} size - Kích thước bảng (vd: 3 cho bảng 3x3)
 * @returns {Array} - Mảng 2D biểu diễn trạng thái bảng hiện tại
 */
export function deriveGameBoard(turns, size) {
    // Bước 1: Tạo mảng 2 chiều (size x size), ban đầu toàn null (chưa có người đánh)
    const board = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => null)
    );

    // Bước 2: Duyệt qua danh sách các lượt chơi,
    // và điền giá trị X hoặc O vào đúng vị trí trên bảng.
    // Ví dụ dữ liệu turns giả sử:
    // [
    //   { square: [0, 0], player: 'X' },
    //   { square: [1, 2], player: 'O' },
    //   { square: [2, 1], player: 'X' },
    // ]
    for (const turn of turns) {
        const { square, player } = turn; // square = [row, col]
        const [r, c] = square;            // r = row, c = col
        board[r][c] = player;             // Gán player ('X' hoặc 'O') vào ô tương ứng
    }

    // Bước 3: Trả về gameBoard đã được cập nhật
    return board;
}
