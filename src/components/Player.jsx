import React, { useState } from 'react';

export default function Player({ initialPlayer, isActive, onChange }) {
    const [isEdit, setIsEdit] = useState(false);
    const [draftName, setDraftName] = useState(initialPlayer.name);

    const handleEditPlayer = () => {
        // khi click thì đổi nút thành save
        if (isEdit) {
            // Nếu đang ở chế độ edit thì bấm là Save
            onChange(draftName);
        }

        setIsEdit(prev => !prev);
    }

    return (
        <li className={`${isActive ? 'active' : ''}`}>
            <span className={`player`}>
                {
                    isEdit
                        ? <input
                            type="text"
                            className="player-name"
                            value={draftName}
                            onChange={(e) => setDraftName(e.target.value)}
                            required
                            maxLength={30}
                            autoFocus
                        />
                        : <span className="player-name">{draftName}</span>
                }

                <span className="player-symbol">{initialPlayer.symbol}</span>
            </span>
            <button className="" onClick={handleEditPlayer}>{isEdit ? "Save" : "Edit"}</button>
        </li>
    );
}