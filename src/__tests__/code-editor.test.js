import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { getOne } from "../models/fetch.js";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import UpdateDoc from '../update-doc.jsx';
import { runCode } from "../models/exec";

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

describe('Tests code editor', () => {

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test('tests that the run code function gets called correctly', async () => {
        useLocation.mockReturnValue({state: "test"});
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "console.log('Test')", mode: "code"};
        getOne.mockResolvedValue(mockResponse);
        runCode.mockReturnValue("Test");

        await act(async () => {
            render(<UpdateDoc />);
        });

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Run code/i }));
        });

        expect(runCode).toHaveBeenCalledWith("console.log('Test')");
        const codeOutput = document.getElementsByClassName('code-output')[0];
        expect(codeOutput).toBeInTheDocument;
        expect(codeOutput.textContent).toBe("Test");
    });
});
