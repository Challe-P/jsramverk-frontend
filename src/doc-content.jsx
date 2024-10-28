import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import Delta from 'quill-delta';
import { useEffect, useRef } from 'react';

export default function DocContent({doccontent}) {
    const quillRef = useRef(null);
    useEffect(() => {
        const delta = new Delta(doccontent);
        quillRef.current.getEditor().setContents(delta, 'silent');
    }, [doccontent])
    
    return (
        <div 
            className="doc-content-div">
                <ReactQuill
                    readOnly
                    ref={quillRef}
                    theme='bubble'
                />
        </div>
    )
}
