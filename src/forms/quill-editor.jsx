import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Delta from 'quill-delta';
import { useEffect, useRef } from "react";

export function QuillEditor({content, setContent, delta,
    setDelta, deltaIsLatest, setDeltaIsLatest, setEditorMode,
    title, setTitle, socket, id}) {
    const quillRef = useRef(null);

    // Loads the data sent from parent properly
    useEffect(() =>
    {
        if (!socket)
        {
            return;
        }
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
                return;
            }
            setDelta(quillRef.current.getEditor().getContents());
            setDeltaIsLatest(true);
            setContent(quillRef.current.getEditor().getText());
            console.log("emitting")
            socket.emit('doc', { id, title: title, content: delta, user: socket.id, mode: "text" });
        }

        // Listener on quill editor
        quillRef.current.getEditor().on('text-change', handleTextChange);

        const onDoc = (data) => {
            if (data.user === socket.id)
            {
                return;
            }
            if (data.title !== undefined) {
                setTitle(data.title);
            }
            if (data.mode === "code") {
                setEditorMode("code");
                setContent(data.content);
                return;
            }
            const delta = new Delta(data.content);
            quillRef.current.getEditor().updateContents(delta, 'silent');
            setDelta(quillRef.current.getEditor().getContents());
            setDeltaIsLatest(true);
        };

        socket.on("doc", onDoc);
        return () => {
            socket.off("doc", onDoc);
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.emit("doc", { id, title: title, user: socket.id});
        }
    }, [title]);

    return (
    <ReactQuill 
      ref={quillRef}
      theme="snow"
    />
    )
}
