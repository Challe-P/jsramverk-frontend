import { getAll } from '../models/fetch';
import { baseURL } from '../utils';

// Mocking fetch to test module without network connections
global.fetch = jest.fn();

describe('Test suite for fetch module', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('Testing getAll. Should return some data.', async () => {
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({data: [{id: "aoiwdhawaodih", title: "A title", content: "some content"}]
            })
        });
        const data = await getAll();
        expect(fetch).toHaveBeenCalledWith(baseURL, {
            headers: { 'content-type': 'application/json' },
            method: 'GET',
        });
    });
});
