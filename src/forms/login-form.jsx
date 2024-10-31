import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { login } from '../models/auth.js';

export function LoginForm({setToken}) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await login(data, setToken);
            navigate("/", { state: { message: "User was successfully logged in!"}})
        } catch (err) {
            console.error(err);
        }
    };

    return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="username">Username</label>
            <input 
                id="username"
                aria-invalid={errors.username ? "true" : "false"} 
                type="text"
                required={true}
                {...register("username")} 
                onInvalid={e => e.target.setCustomValidity("A username is required")}
                onInput={e => e.target.setCustomValidity("")} 
            />

            <label htmlFor="password">Password</label>
            <input 
                id="password"
                aria-invalid={errors.password ? "true" : "false"} 
                type="password" 
                required={true}
                {...register("password")}
                onInvalid={e => e.target.setCustomValidity("A password is required")}
                onInput={e => e.target.setCustomValidity("")}
            />

            {/* include validation with required or other standard HTML validation rules */}
            
            <input type="submit" value="Login" className='button' />
        </form>
    );
}
