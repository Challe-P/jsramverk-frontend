import React from 'react';
import { useForm } from "react-hook-form";
import { updateDocument, getOne, removeOne } from "../models/fetch";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function UpdateForm() {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm();
    
    // Fetch document and set field values to document title and content
    useEffect (() => {
        const fetchData = async () => {
            try {
                const doc = await getOne(id);

                //Change state
                setContent(doc.content);
                setTitle(doc.title);

                //Change input field values
                setValue("title", doc.title);
                console.log("content: ", content);

                setValue("content", doc.content); 
                console.log("content: ", content);

            } catch (error) {
                console.error(error);
                navigate("/", { state: { message: "An error occurred"}});
            }
        };

        fetchData();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        data.content = content;
        if (data.title === "") {
            data.title = title;
        };
        
        const response = await updateDocument(data);

        if (response.status === 200) {
            navigate("/", { state: { message: "Document was successfully updated."}});
        } else {
            console.log("Server issues.");
            console.error(response);
        }

    };

    const handleDelete = async () => {
        try {
            const response = await removeOne(id);
            
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

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" defaultValue={title} {...register('title')} />
            <ReactQuill ReactQuill theme="snow" id='content' value={content} onChange={setContent} />
            <input type="text" name="id" hidden defaultValue={id} {...register("id")}/>
            <input type="submit" value="Save changes" />
            <button type="button" onClick={handleDelete}>Delete document</button>
        </form>
    );
}
