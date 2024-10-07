import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { io } from "socket.io-client";
import { baseURL } from "../utils";
import Delta from 'quill-delta';
import { useState, useEffect, useRef } from "react";

export function QuillEditor({socket, id}) {
    const quillRef = useRef(null);

    // Second useEffect, starts socket and listens for changes
    useEffect (() => {
        if (socket.current) {
        
        const handleTextChange = (delta, oldDelta, source) => {
            // Function to handle changes in quill editor
            if (source !== 'user') {
                return;
            }
            socket.current.emit('doc', { id, content: delta, user: socket.current.id });
        }

        // Listener on quill editor
        quillRef.current.getEditor().on('text-change', handleTextChange);


        const onDoc = (data) => {
            if (data.user === socket.current.id)
            {
                return;
            }
            const delta = new Delta(data.content);
            quillRef.current.getEditor().updateContents(delta, 'silent');                
        };

        socket.current.on("doc", onDoc);
        return () => {
            socket.current.off('doc', onDoc);
        }
    }
    }, [baseURL]);
    
    return (
    <ReactQuill 
      ref={quillRef}
      theme="snow"
    />
    )
}
