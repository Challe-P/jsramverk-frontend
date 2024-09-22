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

    return response;
}

export async function getOne(id) {
    const url = `${baseURL}/doc/${id}`;
    const response = await fetch(url);
    const json = await response.json();

    return json.data[0];
}

export async function UpdateDocument(data) {
        
        const updateBody = {
            "id": data._id,
            "title": data.title,
            "content": data.content,
        }

        const response = await fetch(`${baseURL}/update`, {
            body: JSON.stringify(updateBody),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST', //PUT gives a 404
        })

        console.log(response);
        
}