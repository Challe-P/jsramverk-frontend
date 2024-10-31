import { register, login } from '../models/auth';
import { baseURL } from '../utils';

// Mocking fetch to test module without network connections
global.fetch = jest.fn();

describe('Test suite for auth module', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
    });

    afterAll(() => {
        global.console.log.mockRestore();
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    beforeEach(() => {
        fetch.mockClear();
    });

    test('Testing register.', async () => {
        const mockedData = {
            username: "Test",
            email: "test@test.com",
            password: "testing"
        }
        fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValueOnce({status: 200})            
        });
        const response = await register(mockedData);
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/register`, {
            body: JSON.stringify(mockedData),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        });

        expect(response.status).toEqual(200)
    });

    test('Testing login.', async () => {
        const setToken = jest.fn();
        const mockedData = {
            username: "Test",
            password: "testing"
        }
        fetch.mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValue({token: "09u90aud90asd79", status: 200})
        });
        const response = await login(mockedData, setToken);
        expect(fetch).toHaveBeenCalledWith(`${baseURL}/login`, {
        body: JSON.stringify(mockedData),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        });

        expect(response.status).toBe(200);
        expect(setToken).toHaveBeenCalledWith("09u90aud90asd79");
    });
});
