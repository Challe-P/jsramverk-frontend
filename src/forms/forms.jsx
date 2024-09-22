import { useForm } from "react-hook-form"
import { UpdateDocument } from "../models/fetch";
// import { useEffect, useState } from "react";

export function UpdateForm() {
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

    const OnSubmit = async (data) => {
        console.log("Data: ", data);
        await UpdateDocument(data);
    }

    console.log(watch("content")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(OnSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label for="_id">_id</label>
      <input name="_id" {...register("_id", { required: true })} />
      {errors._id && <span>This field is required</span>}
      <label for="title">title</label>
      <input name="title" {...register("title")} />

      {/* include validation with required or other standard HTML validation rules */}
      <label for="content">content</label>
      <input name="content" {...register("content")} />
      {/* errors will return when field validation fails  */}
      {errors._id && <span>This field is required</span>}

      <input type="submit" value="Update document" />
    </form>
  )
}