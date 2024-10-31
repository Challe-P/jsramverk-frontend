import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { login } from "../models/auth.js";
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../login.jsx';
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}));

// Mock the addOne function
jest.mock("../models/auth", () => ({
    login: jest.fn()
}));

describe('Tests register route.', () => {
    
    beforeAll(() => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
    });

    beforeEach(() => {
        useLocation.mockReturnValue({state: "test"});
    });

    afterAll(() => {
        global.console.log.mockRestore();
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test('test login function on success', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        login.mockResolvedValue({status: 200});
        await act(async () => {
            render(<Login />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Login/i}));
        });

        expect(login).toHaveBeenCalledWith({ username: "Test", password: "testing"}, undefined);
        expect(mockNavigate).toHaveBeenCalledWith("/", { state: { message: "User was successfully logged in!"}});
    });

    test('test register function login fail', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        login.mockImplementation(() => {
            throw new Error("Database on fire")
        });
        await act(async () => {
            render(<Login />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Login/i}));
        });

        expect(login).toHaveBeenCalledWith({ username: "Test", password: "testing"}, undefined);
        expect(console.error).toHaveBeenCalledWith(Error('Database on fire'));
    });
});
