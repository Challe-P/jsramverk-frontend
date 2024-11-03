import React from "react";

export function CommentPopup({value, setValue, onSave, onClose, position}) {
    const handleSubmit = (event) => {
        event.preventDefault()
        onSave(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSave(value);
        }
        if (e.key === "Escape") {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div className="comment-popup" style={{top: position[1], left: position[0]+10}} >
            <div className="comment-header">
                <h4>{value ? "Edit comment" : "Add a comment"}</h4>
                <button type="button" className="cancel" onClick={onClose}>&#10006;</button>
            </div>
            <label htmlFor="comment" hidden>Comment</label>            
            <input
                autoFocus
                id="comment-input"
                type="text"
                name="comment"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="popup-buttons">
                <button type="button" onClick={onClose}>Cancel</button>
                {value && <button type="button" onClick={() => onSave("")}>Delete</button>}
                <button type="button" id="comment-save" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}
