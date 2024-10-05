import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { updateDocument, getOne, removeOne } from "../models/fetch";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { io } from "socket.io-client";
import { baseURL } from "../utils";
import Delta from 'quill-delta';

export function UpdateForm() {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.
    const { id } = useParams();
    const [title, setTitle] = useState("");
    
    const navigate = useNavigate();
    const quillRef = useRef(null);
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
                const delta = new Delta(doc.content);
                if (delta.ops.length !== 0) {
                    quillRef.current.getEditor().setContents(delta, 'silent');
                } else {
                    quillRef.current.getEditor().setText(doc.content);
                }                
                setTitle(doc.title);
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };

        fetchData();
    }, [id]);

    // Second useEffect, starts socket and listens for changes
    useEffect (() => {
        // Connect socket
        socket.current = io(baseURL);

        socket.current.on("connect", () => {
            console.log(socket.current.id);
        });

        const handleTextChange = (delta, oldDelta, source) => {
            // Function to handle changes in quill editor
            if (source !== 'user') {
                return;
            }
            socket.current.emit('doc', { id, content: delta, user: socket.current.id });
        }

        // Listener on quill editor
        quillRef.current.getEditor().on('text-change', handleTextChange);

        // Emits document id to create a socket.current room
        socket.current.emit("create", id);

        const onDoc = (data) => {
            if (data.user === socket.current.id)
            {
                return;
            }
            const delta = new Delta(data.content);
            quillRef.current.getEditor().updateContents(delta, 'silent');
            if (data.title !== undefined) {
                console.log(title)
                setTitle(data.title);
            }
        };

        socket.current.on("doc", onDoc);
        return () => {
            socket.current.off('doc', onDoc);
            socket.current.disconnect();
        }
    }, [baseURL]);

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
        data.content = quillRef.current.editor.getContents();
        
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


    /* Old way to watch the title. Need to fix a new one.
    const watchedTitle = watch("title");
    
    useEffect(() => {
        // Detta skapar en loop som mynnar ut i att inget finns kvar 
        if (socket.current && (watchedTitle)) {
            if (external.current) {
                external.current = false;
            } else {
                // Emit updated content to the server on each change
                socket.current.emit("doc", { id, title: watchedTitle, 
                    content: quillRef.current.getEditor().getContents(),
                    user: socket.current.id });
            }
        }
    }, [watchedTitle]); 
    */
    

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" defaultValue={title} {...register('title')} />
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                    />
            <input type="text" name="id" hidden defaultValue={id} {...register("id")}/>
            <input type="submit" value="Save changes" />
            <button type="button" onClick={handleDelete}>Delete document</button>
        </form>
    );
}
