import React, { useState } from 'react';


export default function Player({ index, player, onEditPlayer }) {
    const [isEdit, setIsEdit] = useState(false);
    const [enteredName, setEnteredName] = useState(player.name);

    const handleEditPlayer = () => {
        // khi click thì đổi nút thành save
        setIsEdit(!isEdit);

        // khi click vào nút save sẽ thông báo cho fuction của App thay đổi 
        // isEdit = true => nút Save
        if (isEdit) {
            // hàm này là hàm ở App component
            onEditPlayer(index, enteredName);
        }
    }

    const handleOnChange = (event) => {
        setEnteredName(event.target.value);
    }

    return (
        <li>
            <span className="player">
                {
                    isEdit
                        ? <input className='player-name' type="text" value={enteredName} onChange={handleOnChange} />
                        : <span className="player-name">{player.name}</span>
                }

                <span className="player-symbol">{player.symbol}</span>
            </span>
            <button className="" onClick={handleEditPlayer}>{isEdit ? "Save" : "Edit"}</button>
        </li>
    );
}