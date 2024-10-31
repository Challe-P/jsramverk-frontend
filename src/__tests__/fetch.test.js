import { getAll, updateDocument, addOne, getOne, removeOne, shareDocument } from '../models/fetch';
import { baseURL } from '../utils';

// Mocking fetch to test module without network connections
global.fetch = jest.fn();

describe('Test suite for fetch module', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    afterAll(() => {
        jest.clearAllMocks();
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
            title: "New document",
            content: "",
            mode: "text"
        }
        fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValue("thisIsACoolun1qu3ID")
        });
        const response = await addOne("poadwa890yd");

        expect(fetch).toHaveBeenCalledWith(`${baseURL}/`, {
            body: JSON.stringify(data),
            headers: {
                'auth-token': "poadwa890yd",
                'content-type': 'application/json'
            },
            method: 'POST',
            });
        expect(response).toMatch('thisIsACoolun1qu3ID')
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
    });

    test("Testing share", async () => {
        const id = "thisIsACoolun1qu3ID";
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({status: 200})
        });
        const sentBody = {
            id: id, 
            email: "testbuddy@mail.com"
        }
        await shareDocument(sentBody, "c001t0k3n");
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/share`, {
            body: JSON.stringify(sentBody),
            headers: {
                "auth-token": "c001t0k3n",
                "content-type": "application/json"
        },
        method: "POST"});
    });
});
