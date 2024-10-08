import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Delta from 'quill-delta';
import { useEffect, useRef } from "react";

export function QuillEditor({content, setContent, delta, setDelta, deltaIsLatest, setDeltaIsLatest}) {
    const quillRef = useRef(null);

    // Loads the data sent from parent properly
    useEffect(() =>
    {
        if (delta && deltaIsLatest) 
        {
            quillRef.current.getEditor().setContents(delta, 'silent');
        } else {
        const createdDelta = new Delta(content);
        if (createdDelta.ops.length !== 0) {
            quillRef.current.getEditor().setContents(createdDelta, 'silent');
        } else {
            quillRef.current.getEditor().setText(content);
        }
        }
        const handleTextChange = (delta, oldDelta, source) => {
            // Function to handle changes in quill editor
            if (source !== 'user') {
                quillRef.current.getEditor().updateContents(delta, 'silent')
                return;
            }
            setDelta(quillRef.current.getEditor().getContents());
            setDeltaIsLatest(true);
            setContent(quillRef.current.getEditor().getText());
        }

        // Listener on quill editor
        quillRef.current.getEditor().on('text-change', handleTextChange);
    }, []);
    
    return (
    <ReactQuill 
      ref={quillRef}
      theme="snow"
    />
    )
}
