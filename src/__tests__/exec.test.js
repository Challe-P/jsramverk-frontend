import { runCode } from "../models/exec";

// Mocking fetch to test module without network connections
global.fetch = jest.fn();

describe('Test suite for exec module', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Testing that runCode gets called correctly.', async () => {
        const code = "console.log('Test')";
        const mockedResult = {data: btoa('Test')}
        const sentData = {code: btoa(code)};

        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockedResult)
        });
        const response = await runCode(code);
        
        expect(fetch).toHaveBeenCalledWith("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(sentData),
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        });

        expect(response).toEqual("Test")
    });
});
