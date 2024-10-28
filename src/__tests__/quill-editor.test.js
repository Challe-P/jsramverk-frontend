import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { getOne } from "../models/fetch.js";
import { useLocation, useParams } from 'react-router-dom';
import UpdateDoc from '../update-doc.jsx';
import { runCode } from "../models/exec";
import userEvent from "@testing-library/user-event";
import Delta from 'quill-delta';

// Mock the navigate function for delete function
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
    useNavigate: jest.fn(),
    useLocation: jest.fn(),
}));

// Mock the getOne function
jest.mock("../models/fetch", () => ({
    getOne: jest.fn()
}));

jest.mock("../models/exec", () => ({
    runCode: jest.fn()
}));

describe('Tests quill editor', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test('tests that loading document with delta content works', async () => {
        useLocation.mockReturnValue({state: "test"});
        useParams.mockReturnValue({id: "091823901283"});
        const delta = new Delta({ops: [{"insert": "Fake delta content "}]})
        const mockResponse = {title: "Fake title", content: delta, mode: "text"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });

        expect(screen.getByLabelText('Title')).toHaveValue('Fake title');
        expect(document.getElementsByClassName('ql-editor')[0].textContent).toContain('Fake delta content');
    });
});
