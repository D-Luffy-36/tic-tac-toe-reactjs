export default function Log({ gameTurns }) {
    return (
        <ol id="log">
            {gameTurns.map((turn, idx) => (
                <li key={idx}>
                    Player {turn.player} chọn ô ({turn.square[0]}, {turn.square[1]})
                </li>
            ))}
        </ol>
    );
}
