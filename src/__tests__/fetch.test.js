import { getAll, updateDocument, addOne, getOne, removeOne } from '../models/fetch';
import { baseURL } from '../utils';

// Mocking fetch to test module without network connections
global.fetch = jest.fn();

describe('Test suite for fetch module', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Testing getAll. Should return some data.', async () => {
        const mockedData = {
            data: [{id: "aoiwdhawaodih", title: "A title", content: "some content"}]
        }
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockedData)
        });
        const response = await getAll();
        expect(fetch).toHaveBeenCalledWith(baseURL, {
            headers: { 'content-type': 'application/json' },
            method: 'GET',
        });

        expect(response).toEqual(mockedData)
    });

    test('Testing updateDocument.', async () => {
        const data = { 
            "id": "8971892739123", 
            "title": "Updated title",
            "content": "cool updated content"
        };

        fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValue()
        });
        const response = await updateDocument(data);
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/update`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        });
        expect(response.status).toBe(200);
    });
    
    test('Testing addOne, should return an ID', async () => {
        const data = {
            title: "A title",
            content: "some content"
        };

        fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValue("thisIsACoolun1qu3ID")
        });
        const response = await addOne(data);

        expect(fetch).toHaveBeenCalledWith(`${baseURL}/`, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            });
        const id = await response.json();
        expect(id).toMatch('thisIsACoolun1qu3ID')
    });

    test('Testing get one, should return some data', async () => {
        const id = "thisIsACoolun1qu3ID";
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({data: [{id: "thisIsACoolun1qu3ID", title: "A title", content: "some content"}]})
        });
        const response = await getOne(id);
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/doc/${id}`, {"headers": {"auth-token": undefined}, "method": "GET"});
        expect(response).toEqual({id: "thisIsACoolun1qu3ID", title: "A title", content: "some content"});
    });

    test('Testing removeOne', async () => {
        const id = "thisIsACoolun1qu3ID";
        fetch.mockResolvedValueOnce({
            status: 200
        });
        const response = await removeOne(id);
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/delete`, {
            body: JSON.stringify({'id': id}),
            headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        });
        expect(response.status).toBe(200);
    })
});

/*
export async function removeOne(id) {
    const response = await fetch(`${baseURL}/delete`, {
        body: JSON.stringify({'id': id}),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    });
    */