import { baseURL } from "../utils";

/**
 * Fetch all documents from cloud database at baseURL
 * @returns
 */
export async function getAll(token) {
    const response = await fetch(baseURL, {
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        method: 'GET',
    });
    return response.json();
}

export async function getOne(id, token) {
    const url = `${baseURL}/doc/${id}`;
    const response = await fetch(url, {
        headers: {
            'auth-token': token,
        },
        method: 'GET',
    });
    const json = await response.json();

    return json.data[0];
}

export async function updateDocument(data, token) {
    const updateBody = {
        "id": data.id,
        "title": data.title,
        "content": data.content,
    };

    const response = await fetch(`${baseURL}/update`, {
        body: JSON.stringify(updateBody),
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        method: 'POST', //PUT gives a 404
    });

    return response;
}

export async function shareDocument(data, token) {
    const updateBody = {
        "id": data.id,
        "email": data.email,
    };

    const response = await fetch(`${baseURL}/share`, {
        body: JSON.stringify(updateBody),
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        method: 'POST', //PUT gives a 404
    });

    return response;
}

export async function addOne(data, token) {
    const body = {
        "title": data.title,
        "content": data.content
    };

    const response = await fetch(`${baseURL}/`, {
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        method: 'POST',
    });

    return response;
}

export async function removeOne(id, token) {
    const response = await fetch(`${baseURL}/delete`, {
        body: JSON.stringify({'id': id}),
        headers: {
            'content-type': 'application/json',
            'auth-token': token,
        },
        method: 'POST',
    });

    return response
}
