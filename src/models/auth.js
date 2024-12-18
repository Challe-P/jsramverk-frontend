import { baseURL } from "../utils";

export async function register(data) {
        const userBody = {
            "username": data.username,
            "email": data.email,
            "password": data.password,
        };
    
        const response = await fetch(`${baseURL}/register`, {
            body: JSON.stringify(userBody),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });
    
        const res = await response.json();

        return res;
    }
    
export async function login(data, setToken) {
        const userBody = {
            "username": data.username,
            "password": data.password,
        };

        const response = await fetch(`${baseURL}/login`, {
            body: JSON.stringify(userBody),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });

        const result = await response.json();
        sessionStorage.setItem("token", result.token);
        setToken(result.token);
        console.log("Token is successfully set.");
    
        return response;
}
