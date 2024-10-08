import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { getOne, updateDocument, removeOne } from "../models/fetch.js";
import { useParams, useNavigate } from 'react-router-dom';
import UpdateDoc from '../update-doc.jsx';
import { Quill } from 'react-quill';

// Mock the navigate function for delete function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

// Mock the getOne function
jest.mock("../models/fetch", () => ({
    getOne: jest.fn(),
    updateDocument: jest.fn(),
    removeOne: jest.fn(),
}));

describe('UpdateDoc', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
    });

    afterAll(() => {
        global.console.log.mockRestore();
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test('show document', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });
        expect(screen.getByLabelText('Title')).toHaveValue('Fake title');
        expect(document.getElementsByClassName('ql-editor')[0].textContent).toContain('Fake content');
    });

    test('update document', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);

        await act(async () => {
            render(<UpdateDoc />);
        });

        await act( async () => {
            await screen.findByText("Fake content");
            fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Fake updated title' } });
            let quill = Quill.find(document.getElementsByClassName('ql-container')[0]);
            expect(quill).toBeInstanceOf(Quill);
            quill.setText("Fake updated content");
        });

        await act( async () => {
            await screen.findByText("Fake updated content");
            fireEvent.click(screen.getByRole('button', { name: /Save changes/i }));       
        });
    
        expect(screen.getByLabelText('Title')).toHaveValue('Fake updated title');
        expect(document.getElementsByClassName('ql-editor')[0].textContent).toContain('Fake updated content');
        expect(updateDocument).toHaveBeenCalledWith({"content": "<p>Fake updated content</p>", "id": "091823901283", "title": "Fake updated title"});
    });

    test('delete document', async () => {
        // Mocks so that useNavigate doesn't fail.
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);

        // Mocks an 'ok' response from removeOne
        removeOne.mockResolvedValue({status: 200})
        await act(async () => {
            render(<UpdateDoc />);
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Delete document/i }));
        });

        await waitFor(() => {
            expect(removeOne).toHaveBeenCalledWith('091823901283');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    test('failed getting of document', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        useParams.mockReturnValue({id: "091823901283"});
        getOne.mockImplementation(() => {
            throw new Error();
        });
        await act(async () => {
            render(<UpdateDoc />);          
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('handle delete big error', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);

        // Mocks removeOne throw an error
        removeOne.mockImplementation(() => {
            throw new Error('Big error!');
        })
        await act(async () => {
            render(<UpdateDoc />);
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Delete document/i }));
        });

        await waitFor(() => {
            expect(removeOne).toHaveBeenCalledWith('091823901283');
        });
        expect(console.error).toHaveBeenCalledTimes(1);
    });

    test('handle delete server error', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);

        // Mocks removeOne throw an error
        removeOne.mockReturnValue({status: 500});
        await act(async () => {
            render(<UpdateDoc />);
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Delete document/i }));
        });

        await waitFor(() => {
            expect(removeOne).toHaveBeenCalledWith('091823901283');
        });
        expect(console.error).toHaveBeenCalledTimes(1);
    })
});
