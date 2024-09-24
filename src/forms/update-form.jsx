import React from 'react';
import { useForm } from "react-hook-form";
import { updateDocument, getOne, removeOne } from "../models/fetch";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function UpdateForm() {
    // Den här hämtar datan hela tiden. Borde hämta en gång och sen låta det vara? Iof när socketen ska igång är det ju bra.

    const { id } = useParams();
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    (async (id) => {
        const doc = await getOne(id);

        setContent(doc.content);
        setTitle(doc.title);
    })(id);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const OnSubmit = async (data) => {
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
                console.log("Server issues.")
                console.log(response);
            }
        } catch (error) {
            console.log("Something went wrong");
            console.log(error);
        }
    }

    console.log(watch("content")); // watch input value by passing the name of it

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(OnSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" defaultValue={title} {...register("title")} />

            {/* include validation with required or other standard HTML validation rules */}
            <label htmlFor="content">Content</label>
            <input type="textarea" name="content" defaultValue={content} {...register("content")} />
            <input type="text" name="id" hidden defaultValue={id} {...register("id")}/>
            <input type="submit" value="Save changes" />
            <button type="button" onClick={handleDelete}>Delete document</button>
        </form>
    );
}
