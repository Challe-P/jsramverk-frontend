import React from 'react';
import { set, useForm } from "react-hook-form";
import { updateDocument, getOne, removeOne } from "../models/fetch";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import { io } from "socket.io-client";
import { baseURL } from "../utils";
import { CodeEditor } from './code-editor';
import { QuillEditor } from './quill-editor';

export function UpdateForm() {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editorMode, setEditorMode] = useState("text");
    const [delta, setDelta] = useState("");
    const [deltaIsLatest, setDeltaIsLatest] = useState(true);
    const isFromSocket = useRef(true);
    
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
                setTitle(doc.title);
                if (typeof(doc.content) === "object") {
                    setDelta(doc.content);
                    setEditorMode("text");
                } else {                    
                    setContent(doc.content);
                    setDeltaIsLatest(false);
                    setEditorMode("code");
                }
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };

        fetchData();

        // Function for incoming socket packages
        const onDoc = (data) => {
            isFromSocket.current = true;
            if (data.user !== socket.current.id)
            {
                setEditorMode(data.mode);
                if (data.mode === "text")
                {
                    setDelta(data.content);
                    setDeltaIsLatest(true);
                } else {
                    setContent(data.content);
                }
                setTitle(data.title);
            }
            isFromSocket.current = false;
        };

        socket.current = io(baseURL);
        socket.current.emit("create", id);
        socket.current.on("doc", onDoc);
        isFromSocket.current = false;

        return () => {
            socket.current.off('doc', onDoc);
            socket.current.disconnect();
        }
    }, [id, baseURL]);

    // This useEffect sets up the emitter for the socket it doesn't work because it runs on every change, so it becomes an infinite loop
    // TODO fix this.
    /*
    useEffect ((e) => {
        console.log(e)
        if (!isFromSocket.current)
        {
            let sentContent = content;
            if (deltaIsLatest) {
                sentContent = delta;
            }
            console.log("Emitting!")
            socket.current.emit('doc', { id, title: title, content: sentContent, user: socket.current.id, mode: editorMode });
        }
    }, [content, title]);
    */

    const onSubmit = async (data) => {
        data.content = content;
        if (deltaIsLatest)
        {
            data.content = delta;
        }
        data.title = title;
        console.log(data)
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
            <input id="title" type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
            {editorMode === "text" ? (
                <QuillEditor
                content={content}
                setContent={setContent}
                delta={delta}
                setDelta={setDelta}
                deltaIsLatest={deltaIsLatest}
                setDeltaIsLatest={setDeltaIsLatest}
                />
            ) : (
                <CodeEditor
                content={content}
                setContent={setContent}
                setDeltaIsLatest={setDeltaIsLatest}
                />
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
