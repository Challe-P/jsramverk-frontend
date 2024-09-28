import { baseURL } from "../utils";

/**
 * Fetch all documents from cloud database at baseURL
 * @returns
 */
export async function getAll() {
    const response = await fetch(baseURL, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
    });

    return response.json();
}

export async function getOne(id) {
    const url = `${baseURL}/doc/${id}`;
    const response = await fetch(url);
    const json = await response.json();

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
