import React, { useState } from 'react';


export default function Player({ index, player }) {
    const [isEdit, setIsEdit] = useState(false);
    const [enteredName, setEnteredName] = useState(player.name);

    const handleEditPlayer = () => {
        // khi click thì đổi nút thành save
        setIsEdit((pre) => {
            const newState = !pre;
            console.log('New State:', newState);
            return newState;
        });

        // khi click vào nút save sẽ thông báo cho fuction của App thay đổi 
        // isEdit = true => nút Save
        if (isEdit) {
            // hàm này là hàm ở App component

        }
    }

    return (
        <li>
            <span className="player">
                {
                    isEdit
                        ? <input
                            type="text"
                            className="player-name"
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.target.value)}
                            required
                            maxLength={30}
                            autoFocus
                        />

                        : <span className="player-name">{enteredName}</span>
                }

                <span className="player-symbol">{player.symbol}</span>
            </span>
            <button className="" onClick={handleEditPlayer}>{isEdit ? "Save" : "Edit"}</button>
        </li>
    );
}