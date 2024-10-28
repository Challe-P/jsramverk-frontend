import React from 'react';
import { set, useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { updateDocument, shareDocument, getOne, removeOne } from "../models/fetch";
import 'react-quill-new/dist/quill.snow.css';
import { io } from "socket.io-client";
import { baseURL } from "../utils";
import { CodeEditor } from './code-editor';
import { QuillEditor } from './quill-editor';

export function UpdateForm({token, setToken}) {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state ? location.state.message : "";
    const [editorMode, setEditorMode] = useState("text");
    const [delta, setDelta] = useState("");
    const [deltaIsLatest, setDeltaIsLatest] = useState(true);
    
    const socket = useRef(null);
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm();

    // First useEffect. Fetches data and sets it.
    useEffect (() => {
        const fetchData = async () => {
            // Fetches data from atlasDB and sets it
            try {
                const doc = await getOne(id, token);
                setTitle(doc.title);
                if (typeof(doc.content) === "object") {
                    setDelta(doc.content);
                    setDeltaIsLatest(true);
                    setEditorMode("text");
                } else if (doc.mode === "text") {
                    setContent(doc.content);
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
        socket.current = io(baseURL);
        socket.current.emit("create", id);
        return () => {
            socket.current.off('doc');
            socket.current.disconnect();
        }
    }, [id, navigate, token]);

    const onSubmit = async (data) => {
        data.content = content;
        if (deltaIsLatest)
        {
            data.content = delta;
        }
        data.title = title;
        console.log(data);
        const response = await updateDocument(data, token);
        if (response.status === 200) {
            console.log(response);
        } else {
            console.log("Server issues.");
            console.error(response);
        }
    };

    const handleDelete = async () => {
        // Kanske en alert-ruta?
        try {
            const response = await removeOne(id);
            console.log(response);
            
            if (response.status === 200) {
                navigate("/", { state: { message: "Document was successfully removed."}});
            } else {
                console.log("Server issues.");
                console.error(response);
            }
        } catch (error) {
            console.log("Something went wrong");
            console.error(error);
        }
    };


    const handleShare = async (data) => {
        data.id = id;
        console.log("Share this document.", data);

        try {
            const response = await shareDocument(data, token);
            if (response.status === 200) {
                navigate("#", { state: { message: `Document is now shared with ${data.email}!`}});
            } else {
                console.log("Server issues.");
                console.error(response);
            }
        } catch (error) {
            console.log("Something went wrong");
            console.error(error);
        }

    }
    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <div>
              <h1>{message}</h1>
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
                socket={socket.current}
                title={title}
                setTitle={setTitle}
                id={id}
                setEditorMode={setEditorMode}
                />
            ) : (
                <CodeEditor
                content={content}
                setContent={setContent}
                setDelta={setDelta}
                setDeltaIsLatest={setDeltaIsLatest}
                title={title}
                socket={socket.current}
                setTitle={setTitle}
                id={id}
                setEditorMode={setEditorMode}
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
        <form onSubmit={handleSubmit(handleShare)}>
            <input type="email" id="email" {...register('email')} />
            <input type="submit" value="Share document" />
        </form>
     </div>
    );
}
