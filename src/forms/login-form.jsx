import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import auth from '../models/auth.js';

export function LoginForm({token, setToken}) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await auth.login(data, setToken);
            navigate("/", { state: { message: "User was successfully logged in!"}})
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="username">Username</label>
            <input 
                id="username"
                aria-invalid={errors.name ? "true" : "false"} 
                type="text" 
                name="username" 
                required={true}
                {...register("username")} 
                onInvalid={e => {
                    e.currentTarget.setCustomValidity("A username is required");
                }}
                onChange={e => {
                    e.currentTarget.setCustomValidity("");
                }}
            />

            <label htmlFor="password">Password</label>
            <input 
                id="password"
                aria-invalid={errors.name ? "true" : "false"} 
                type="password" 
                name="password" 
                required={true}
                {...register("password")} 
                onInvalid={e => {
                    e.currentTarget.setCustomValidity("A password is required");
                }}
                onChange={e => {
                    e.currentTarget.setCustomValidity("");
                }}
            />

            {/* include validation with required or other standard HTML validation rules */}
            
            <input type="submit" value="Login" className='button' />
        </form>
    );
}
