import React from "react";
import { useState } from "react";

export function CommentPopup({value, setValue, onSave, onClose}) {
    const handleSubmit = (event) => {
        event.preventDefault()
        onSave(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSave(value);
        }
    };

    return (
        <div>
            <h4>{value ? "Edit comment" : "Add a comment"}</h4>
            <button type="button" className="cancel" onClick={onClose}>&#10006;</button>
            <label htmlFor="comment" hidden>Comment</label>            
            <input
                type="text"
                name="comment"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown} 
            />
            <div className="popup-buttons">
                <button type="button" onClick={onClose}>Cancel</button>
                {value && <button type="button" onClick={() => onSave("")}>Remove comment</button>}
                <button type="button" onClick={handleSubmit}>Save comment</button>
            </div>
        </div>
    )
}
