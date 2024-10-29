import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import Delta from 'quill-delta';
import { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';

export default function DocContent({doccontent, mode}) {
    const [content, setContent] = useState("");
    const quillRef = useRef(null);
    useEffect(() => { 
        if (mode === "text" || mode === undefined) {
            const delta = new Delta(doccontent);
            quillRef.current.getEditor().setContents(delta, 'silent');
        }
        if (mode === "code") {
            setContent(doccontent);
        }
    }, [doccontent])
    
    return (
        <div className="doc-content-div">
            {mode === "text" || mode === undefined ? (
                <ReactQuill
                readOnly
                ref={quillRef}
                theme='bubble'
            />
            ) : (
                <CodeMirror 
                    value={content}
                    extensions={[javascript({jsx: true}), EditorView.editable.of(false), EditorState.readOnly.of(true)]}
                />
            ) 
            }
        </div>
    )
}
