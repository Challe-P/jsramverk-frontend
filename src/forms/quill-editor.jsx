import React from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import Delta from 'quill-delta';
import { useEffect, useRef } from "react";
import CommentBlot from './comment-blot';

export function QuillEditor({content, setContent, delta,
    setDelta, deltaIsLatest, setDeltaIsLatest, setEditorMode,
    title, setTitle, socket, id}) {
    const quillRef = useRef(null);

    // Define quill toolbar options
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean'],
                ['comment']
            ]
        },
    };

    // Registers commentBlot in quill
    Quill.register(CommentBlot);
    // Removes warning about commentBlot
    Quill.debug('error');

    // Loads the data sent from parent properly
    useEffect(() =>
    {
        quillRef.current.getEditor().off('text-change');
        let isLatest = deltaIsLatest;
        if (!socket)
        {
            return;
        }
        if (delta && isLatest) 
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
            setContent(quillRef.current.getEditor().getText());
            if (!isLatest) {
                socket.emit('doc', { id, title: title, content: quillRef.current.getEditor().getContents(), user: socket.id, mode: "text" });
                setDeltaIsLatest(true);
                isLatest = true;
                return;
            }
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
            isLatest = true;
        };

        function commentHandler() {
            const selection = quillRef.current.getEditor().getSelection();
            if (selection) {
                // Uses the browsers built in prompt. Maybe not super pretty?
                const userComment = prompt("Skriv din kommentar:");
                // Add username to comment? Timestamp? Unique id?
                quillRef.current.getEditor().formatText(selection.index, selection.length, 'comment',
                    userComment, "user");
                //const commentSpan = document.getElementById(commentId);
                //commentSpan.addEventListener('click', editComment);
            }
        }

        const commentButton = document.getElementsByClassName('ql-comment')[0];
        commentButton.addEventListener('click', commentHandler)

        socket.on("doc", onDoc);
        return () => {
            commentButton.removeEventListener('click', commentHandler)
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
      modules={modules}
    />
    )
}
