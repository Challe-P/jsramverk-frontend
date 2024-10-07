import React from 'react';
import { useForm } from "react-hook-form";
import { updateDocument, getOne, removeOne } from "../models/fetch";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import { io } from "socket.io-client";
import { baseURL } from "../utils";
import { CodeEditor } from './code-editor';
import { QuillEditor } from './quill-editor';
import Delta from 'quill-delta';

export function UpdateForm() {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editorMode, setEditorMode] = useState("code")
    
    const navigate = useNavigate();
    const socket = useRef(null);
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm();

    const watchedTitle = watch('title');

    // First useEffect. Fetches data and sets it.
    useEffect (() => {
        const fetchData = async () => {
            // Fetches data from atlasDB and sets it
            try {
                const doc = await getOne(id);
                /*
                const delta = new Delta(doc.content);
                if (delta.ops.length !== 0) {
                    quillRef.current.getEditor().setContents(delta, 'silent');
                } else {
                    quillRef.current.getEditor().setText(doc.content);
                }
                    */          
                setTitle(doc.title);
                setContent(doc.content);
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };

        fetchData();
        socket.current = io(baseURL);
        socket.current.emit("create", id);
        const onTitle = (data) => {
            if (data.user === socket.current.id)
            {
                return;
            }
            setTitle(data.title);
        };
        socket.current.on('doc', onTitle);
    }, [id, baseURL]);


    // Third useEffect, sets up listener for title

    useEffect (() => {
        setTitle(watchedTitle);
        const handleTitleChange = () => {
            socket.current.emit('doc', { id, 'title': watchedTitle,
                user: socket.current.id})
        };
        handleTitleChange();
    }, [watchedTitle]);

    const onSubmit = async (data) => {
        // This needs to be changed to handle both code and quill

        //data.content = quillRef.current.editor.getContents();
        
        if (data.title === "") {
            data.title = title;
        };
        const response = await updateDocument(data);
        console.log(response);
    };

    const handleDelete = async () => {
        // Kanske en alert-ruta?
        try {
            const response = await removeOne(id);
            console.log(response);
            
            if (response.status === 200) {
                navigate("/");
            } else {
                console.log("Server issues.");
                console.error(response);
            }
        } catch (error) {
            console.log("Something went wrong");
            console.error(error);
        }
    };

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" defaultValue={title} {...register('title')} />
            {editorMode === "text" ? (
                <QuillEditor
                socket={socket}
                id={id}
                content={content}
                />
            ) : (
                <CodeEditor
                socket={socket}
                id={id}
                content={content} />
            ) 
            }
            <input type="text" name="id" hidden defaultValue={id} {...register("id")}/>
            <input type="submit" value="Save changes" />
            <button type="button" onClick={handleDelete}>Delete document</button>
            <div>
                <button type="button" onClick={() => setEditorMode("text")}>Text Editor</button>
                <button type="button" onClick={() => setEditorMode("code")}>Code Editor</button>
            </div>
        </form>
    );
}
