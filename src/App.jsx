import React, { useState } from 'react';
import Players from "./components/Players"



function App() {

  const [players, setPlayers] = useState([
    { name: 'player 1', symbol: 'X' },
    { name: 'player 2', symbol: 'O' },
  ]);


  const handleEditPlayer = (index, newName) => {
    console.log(`click ${players[index].name} newName: ${newName}`);

    setPlayers((prev) => {
      const updatedPlayers = [...prev]; // ✅ clone mảng cũ từ prev
      updatedPlayers[index] = {         // ✅ update đúng object cần đổi
        ...updatedPlayers[index],       // ✅ giữ symbol
        name: newName                   // ✅ đổi name
      };
      return updatedPlayers;            // ✅ trả mảng mới về state
    });
  };

  return (
    <main>
      <Players players={players} onEditPlayer={handleEditPlayer} />
      LOG
    </main>
  )
}

export default App
