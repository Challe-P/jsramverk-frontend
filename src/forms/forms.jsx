import React from 'react';
import { useForm } from "react-hook-form";
import { addOne } from "../models/fetch";
// import { useEffect, useState } from "react";

export function NewForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const OnSubmit = async (data) => {
        console.log("Data: ", data);
        await addOne(data);
    };

    console.log(watch("content")); // watch input value by passing the name of it

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(OnSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" {...register("title")} />

            {/* include validation with required or other standard HTML validation rules */}
            <label htmlFor="content">Content</label>
            <input type="textarea" name="content" {...register("content")} />
            <input type="submit" value="Create document" />
        </form>
    );
}
