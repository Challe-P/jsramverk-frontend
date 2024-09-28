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
    
    useEffect (() => {
        const fetchData = async () => {
            try {
                const doc = await getOne(id);
                setContent(doc.content);
                setTitle(doc.title);
                setValue("title", doc.title);
                setValue("content", doc.content); 
            } catch (error) {
                console.error(error);
                navigate("/");
            }
        };

        fetchData();
    }, [id, setValue]);



    const onSubmit = async (data) => {
        data.content = content;
        if (data.title === "") {
            data.title = title;
        };
        console.log("Data: ", data);
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
            <ReactQuill ReactQuill theme="snow" id='content' value={content} onChange={setContent} />
            <input type="text" name="id" hidden defaultValue={id} {...register("id")}/>
            <input type="submit" value="Save changes" />
            <button type="button" onClick={handleDelete}>Delete document</button>
        </form>
    );
}
