```mermaid
flowchart LR
  subgraph React Re-render
    H[Players component rerender] 
  end

  subgraph Render Components
    H --> I[Player List: highlight based on activePlayer]
    H --> J[GameBoard: render board từ gameBoard 2D]
    H --> K[Log: map gameTurns ra các <li>]
    H --> L[Result Banner: show nếu winner ≠ null]
  end
