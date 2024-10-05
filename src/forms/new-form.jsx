// This needs to be removed. The route should just call addOne and then send you to the newly created document.
import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export function NewForm() {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const quillRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        data.content = quillRef.current.editor.getContents();
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
            <input 
                id="title"
                aria-invalid={errors.name ? "true" : "false"} 
                type="text" 
                name="title" 
                required={true}
                {...register("title")} 
                onInvalid={e => {
                    e.currentTarget.setCustomValidity("A document title is required");
                }}
                onChange={e => {
                    e.currentTarget.setCustomValidity("");
                }}
            />

            {/* include validation with required or other standard HTML validation rules */}
            <ReactQuill ReactQuill theme="snow" id='content' value={value} onChange={setValue} ref={quillRef} />
            <input type="submit" value="Create document" />
        </form>
    );
}
