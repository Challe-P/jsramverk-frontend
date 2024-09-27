import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { getOne } from "../models/fetch.js";
import { useParams, useNavigate } from 'react-router-dom';
import UpdateDoc from '../update-doc.jsx';

// Mock the navigate function for delete function
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

// Mock the getOne function
jest.mock("../models/fetch", () => ({
    getOne: jest.fn(),
}));

describe('UpdateDoc', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('show document', async () => {
//        const mockNavigate = jest.fn();
//        useNavigate.mockReturnValue(mockNavigate);
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content"};
        getOne.mockResolvedValue(mockResponse);

        await act(async () => {
            render(<UpdateDoc />);
        });
        expect(screen.getByLabelText('Title')).toHaveValue('Fake title');
        expect(screen.getByLabelText('Content')).toHaveValue('Fake content');
    });
});
