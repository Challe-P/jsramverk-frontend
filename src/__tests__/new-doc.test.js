import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewDoc from '../new-doc.jsx';
import { addOne } from "../models/fetch.js";
import { useNavigate } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import Delta from 'quill-delta';


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

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
    });

    afterAll(() => {
        global.console.log.mockRestore();
        jest.clearAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("render new form", async () => {
        render(<NewDoc />);
        await screen.findByText('Title');
        expect(screen.getAllByRole('textbox')[0]).toHaveProperty('name', 'title');
        expect(document.getElementsByClassName('ql-editor')[0]).toBeInTheDocument();
    });

    test('submits form and navigates', async () => {
        // Setup
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        const mockResponse = '123';
        addOne.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        // Act
        render(<NewDoc />);
        
        userEvent.type(screen.getByLabelText(/title/i), 'My Document');
        // For some reason there needs to be a space after, or else it cuts of the whole word.
        userEvent.type(document.getElementsByClassName('ql-editor')[0], "This is the content");

        fireEvent.click(screen.getByRole('button', { name: /create document/i }));
        const sentDelta = new Delta({ops: [{"insert": `This is the content\n`}]})
        // Assert
        await waitFor(() => {
            expect(addOne).toHaveBeenCalledWith({
                title: 'My Document',
                content: sentDelta,
            });
            expect(mockNavigate).toHaveBeenCalledWith('/id/123');
        });
    });
});
