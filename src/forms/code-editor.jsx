import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function CodeEditor({ content, setContent, setDelta, setDeltaIsLatest, title, socket, id, setEditorMode, setTitle }) {

    // Check if a ViewUpdate contains User Events
    /*
    function isViewUpdateFromUserInput(viewUpdate) {
        if (viewUpdate.docChanged) {
            for (const transaction of viewUpdate.transactions) {
                const userEventType = transaction.annotation(Transaction.userEvent);
                if (userEventType) return userEventType;
            }
        }
  
        return false;
    }
    */
    useEffect(() => {
        const onDoc = (data) => {
            if (data.user !== socket.id)
            {
                if (data.title !== undefined) 
                {
                    setTitle(data.title);
                }
                if (data.mode === "text")
                {
                    setDelta(data.content);
                    setDeltaIsLatest(true);
                    setEditorMode('text');
                    return;
                }
                if (data.content !== undefined)
                {
                    setContent(data.content);
                    setDeltaIsLatest(false);
                }
            }
        }
        socket.on('doc', onDoc);
        return () => {
            socket.off('doc', onDoc)
        }
    });
    const onChange = (value, viewUpdate) => {
        setContent(value);
        setDeltaIsLatest(false);
        socket.emit('doc', { id, content: value, user: socket.id, mode: "code"});
    }

    useEffect(() => {
        if (socket)
        {
            socket.emit('doc', { id, title: title, user: socket.id});
        }
    }, [title]);
    
    return <CodeMirror 
            value={content}
            extensions={[javascript({jsx: true})]} 
            onChange={onChange}
            />;
}
