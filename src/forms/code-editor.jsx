import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function CodeEditor({socket, id}) {
    const [value, setValue] = useState("");
    const onChange = useCallback((val, viewUpdate) => {
        setValue(val);
        socket.current.emit('doc', { id, content: val, user: socket.current.id });
    }, []);

    useEffect (() => {
        if (socket.current) {
        const onDocCode = (data) => {
            if (data.user === socket.current.id)
            {
                return;
            }
            setValue(data.content)
        };

        socket.current.on("doc", onDocCode);
        return () => {
            socket.current.on("doc", onDocCode)
        }
    }
    }, [socket]);


    return <CodeMirror 
            value={value}
            extensions={[javascript({jsx: true})]} 
            onChange={onChange}
            />;
}
