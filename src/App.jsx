import React, { useState } from 'react';
import Players from "./components/Players"



function App() {

  const [players, setPlayers] = useState([
    { name: 'player 1', symbol: 'X' },
    { name: 'player 2', symbol: 'O' },
  ]);


  const [isPlayerXTurn, setIsPlayerXTurn] = useState(true);
  return (
    <main>
      <Players players={players} />
      LOG
    </main>
  )
}

export default App
