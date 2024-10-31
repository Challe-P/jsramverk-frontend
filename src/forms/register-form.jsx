import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { register as authRegister, login } from '../models/auth.js';

export function RegisterForm({setToken}) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await authRegister(data);
            if (result.status === 400) {
                navigate("/register", { state: { message: result.message}});
            } else {
                const res = await login(data, setToken);
                console.log(res)
                if (res.status === 200)
                {
                    navigate("/", { state: { message: "A new user was successfully registered!"}});
                }
                else {
                    navigate("/login", { state: { message: result.message }});
                }
            }
        } catch (err) {
            console.error(err);
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
                onInput={e => {
                    e.currentTarget.setCustomValidity("");
                }}
            />

            <label htmlFor="email">E-mail address</label>
            <input 
                id="email"
                aria-invalid={errors.name ? "true" : "false"} 
                type="email" 
                name="email" 
                required={true}
                {...register("email")} 
                onInvalid={e => {
                    e.currentTarget.setCustomValidity("An e-mail address is required");
                }}
                onInput={e => {
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
                onInput={e => {
                    e.currentTarget.setCustomValidity("");
                }}
            />

            {/* include validation with required or other standard HTML validation rules */}
            
            <button type="submit" value="register">Register</button>
        </form>
    );
}
