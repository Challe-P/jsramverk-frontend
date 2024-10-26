import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { runCode } from '../models/exec';

export function CodeEditor({ content, setContent, setDelta, setDeltaIsLatest, title, socket, id, setEditorMode, setTitle }) {

    const [codeOutput, setCodeOutput] = useState("");
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

    async function sendCode() {
        setCodeOutput(await runCode(content));
    }

    useEffect(() => {
        if (socket)
        {
            socket.emit('doc', { id, title: title, user: socket.id});
        }
    }, [title]);
    
    return <div>
                <CodeMirror 
                    value={content}
                    extensions={[javascript({jsx: true})]} 
                    onChange={onChange}
                />
                <button type="button" onClick={sendCode}>Run code</button>
                <div>
                    <pre className="code-output">
                        {codeOutput}
                    </pre>
                </div>
            </div>;
}
