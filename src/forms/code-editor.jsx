import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export function CodeEditor({ content, setContent, setDeltaIsLatest }) {

    const onChange = (value) => {
        setContent(value);
        setDeltaIsLatest(false);
    }
    
    return <CodeMirror 
            value={content}
            extensions={[javascript({jsx: true})]} 
            onChange={onChange}
            />;
}
