import React from 'react';
import { useForm } from "react-hook-form";
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';

export function NewForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Should navigate to newly created document, but for some reason the ID isn's sent back. Check backend.
        console.log("Data: ", data);
        const response = await addOne(data);
        const id = await response.json();
        console.log("Navigating to: /id/" + id);
        navigate("/id/" + id);
    };

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" {...register("title")} />

            {/* include validation with required or other standard HTML validation rules */}
            <label htmlFor="content">Content</label>
            <input id="content" type="textarea" name="content" {...register("content")} />
            <input type="submit" value="Create document" />
        </form>
    );
}
