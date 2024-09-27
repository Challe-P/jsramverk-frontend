import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewDoc from '../new-doc.jsx';
import { addOne } from "../models/fetch.js";
import { useNavigate } from 'react-router-dom';

// Mock the navigate function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

// Mock the addOne function
jest.mock("../models/fetch", () => ({
    addOne: jest.fn(),
    getOne: jest.fn(),
}));

describe('Tests the new document component', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("render new form", async () => {
        render(<NewDoc />);
        await screen.findByText('Title');
        expect(screen.getAllByRole('textbox')[0]).toHaveProperty('name', 'title');
        expect(screen.getAllByRole('textbox')[1]).toHaveProperty('name', 'content');
    });

    test('submits form and navigates', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const mockResponse = '123';
        addOne.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        render(<NewDoc />);
        
        fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'My Document' } });
        fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'This is the content' } });

        fireEvent.click(screen.getByRole('button', { name: /create document/i }));

        await waitFor(() => {
            expect(addOne).toHaveBeenCalledWith({
                title: 'My Document',
                content: 'This is the content',
            });
            expect(mockNavigate).toHaveBeenCalledWith('/id/123');
        });
    });
});
