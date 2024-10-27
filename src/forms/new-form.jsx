import { useState } from 'react';
import { useForm } from "react-hook-form";
import { addOne } from "../models/fetch";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function NewForm({token, setToken}) {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(token);
        data.content = value;
        const response = await addOne(data, token);
        let res = await response.json();
        navigate("/id/" + res.insertedId, { state: { message: "Document successfully created!"}});
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
            <ReactQuill ReactQuill theme="snow" id='content' value={value} onChange={setValue} />
            <input type="submit" value="Create document" />
        </form>
    );
}
