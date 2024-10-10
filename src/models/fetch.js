import { baseURL } from "../utils";
import auth from "./auth.js";

/**
 * Fetch all documents from cloud database at baseURL
 * @returns
 */
export async function getAll() {
    const response = await fetch(baseURL, {
        headers: {
            'content-type': 'application/json',
            'auth-token': auth.token,
        },
        method: 'GET',
    });

    return response.json();
}

export async function getOne(id) {
    console.log("fetch getOne with token ", auth.token);
    const url = `${baseURL}/doc/${id}`;
    const response = await fetch(url, {
        headers: {
            'auth-token': auth.token,
        },
        method: 'GET',
    });
    const json = await response.json();
    console.log("json response. ", json);

    return json.data[0];
}

export async function updateDocument(data) {
    const updateBody = {
        "id": data.id,
        "title": data.title,
        "content": data.content,
    };

    const response = await fetch(`${baseURL}/update`, {
        body: JSON.stringify(updateBody),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST', //PUT gives a 404
    });

    return response;
}

export async function addOne(data) {
    const body = {
        "title": data.title,
        "content": data.content
    };

    const response = await fetch(`${baseURL}/`, {
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    });

    return response;
}

export async function removeOne(id) {
    const response = await fetch(`${baseURL}/delete`, {
        body: JSON.stringify({'id': id}),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    });

    return response
}
