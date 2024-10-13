import { baseURL } from "../utils";

const auth = {
    token: "",

    register: async function register(data) {
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
            method: 'POST', //PUT gives a 404
        });
    
        const res = await response.json();

        return res;
    },
    
    login: async function login(data) {
    
        const userBody = {
            "username": data.username,
            "password": data.password,
        };
    
        const response = await fetch(`${baseURL}/login`, {
            body: JSON.stringify(userBody),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', //PUT gives a 404
        });
    
        const result = await response.json();
        auth.token = result.token;
    
        return result;
    },
};

export default auth;