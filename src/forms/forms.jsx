import React from 'react';

export default function MyForm() {
    return (
        <form name="documents" action='/' type="submit">
            <label>_id
            <input type="text" />
            </label>
            <label>title
            <input type="text" />
            </label>
            <label>content
            <input type="text" />
            </label>
            <button type="submit">Submit form</button>
        </form>
        );
}