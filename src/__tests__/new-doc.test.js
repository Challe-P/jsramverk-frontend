import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { addOne } from "../models/fetch.js";
import { useNavigate } from 'react-router-dom';
import NewDoc from '../new-doc.jsx';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}));

// Mock the addOne function
jest.mock("../models/fetch", () => ({
    addOne: jest.fn()
}));

describe('Tests new doc route.', () => {
    
    afterAll(() => {
        jest.clearAllMocks();
    });
   
    test('test route without token', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        await act(async () => {
            render(<NewDoc />);
        });
        expect(mockNavigate).toBeCalledWith('/login', {state: { message: "Log in to create documents."}})
    });

    test('create new document with token', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const mockResponse = {
            acknowledged: true,
            insertedId: "90qwa8yda8912" };
        addOne.mockResolvedValue(mockResponse);

        await act(async () => {
            render(<NewDoc {...{ token: "poawjdopajwopdj" }} />);
        });
        expect(addOne).toHaveBeenCalledWith('poawjdopajwopdj');
        expect(mockNavigate).toHaveBeenCalledWith('/id/90qwa8yda8912',  {"state": {"message": "Document successfully created!"}});
    });


});
