```mermaid
stateDiagram-v2
    [*] --> EmptyBoard : "khởi tạo"

    state EmptyBoard
    note right of EmptyBoard : "gameTurns is empty"
    note right of EmptyBoard : "activePlayer = X"

    EmptyBoard --> XMoved : "X chọn ô (r,c)"

    state XMoved
    note right of XMoved : "gameTurns has 1 turn by X"
    note right of XMoved : "activePlayer = O"

    XMoved --> OMoved : "O chọn ô (r,c)"

    state OMoved
    note right of OMoved : "gameTurns has 2 turns (X,O)"
    note right of OMoved : "activePlayer = X"

    OMoved --> XMoved2 : "X chọn ô tiếp theo"

    state XMoved2
    note right of XMoved2 : "gameTurns has 3 turns (X,O,X)"
    note right of XMoved2 : "activePlayer = O"

    %% Khi checkWinner hoặc isBoardFull
    XMoved2 --> End : "game over"
    OMoved --> End : "game over"
    EmptyBoard --> End : "game over"

    state End
    note right of End : "show Result + nút \"Chơi lại\""
