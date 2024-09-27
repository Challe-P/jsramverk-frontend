import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function NewForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        data.content = value;
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
            <ReactQuill ReactQuill theme="snow" value={value} onChange={setValue} />
            <input type="submit" value="Create document" />
        </form>
    );
}
