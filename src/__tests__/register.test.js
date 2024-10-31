import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { register, login } from "../models/auth.js";
import { useLocation, useNavigate } from 'react-router-dom';
import Register from '../register.jsx';
import userEvent from "@testing-library/user-event";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}));

// Mock the addOne function
jest.mock("../models/auth", () => ({
    register: jest.fn(),
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

    test('test route display', async () => {
        
        await act(async () => {
            render(<Register />);
        });
        expect(screen.findByText("E-mail address")).toBeInTheDocument;
        expect(screen.findByText("Password")).toBeInTheDocument;
    });

    test('test register function on success', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        register.mockResolvedValue({status: 200});
        login.mockResolvedValue({status: 200});
        await act(async () => {
            render(<Register />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('E-mail address'), "test@testguy.com");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Register/i}));
        });

        expect(register).toHaveBeenCalledWith({ username: "Test", email: "test@testguy.com", password: "testing"});
        expect(mockNavigate).toHaveBeenCalledWith("/", { state: { message: "A new user was successfully registered!"}});
    });

    test('test register function fail 400 code', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        register.mockResolvedValue({status: 400});
        
        await act(async () => {
            render(<Register />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('E-mail address'), "test@testguy.com");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Register/i}));
        });

        expect(register).toHaveBeenCalledWith({ username: "Test", email: "test@testguy.com", password: "testing"});
        expect(mockNavigate).toHaveBeenCalledWith("/register", { state: { message: undefined}});
    });

    test('test register function login fail', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        register.mockResolvedValue({status: 200});
        login.mockResolvedValue({status: 400});
        await act(async () => {
            render(<Register />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('E-mail address'), "test@testguy.com");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Register/i}));
        });

        expect(register).toHaveBeenCalledWith({ username: "Test", email: "test@testguy.com", password: "testing"});
        expect(login).toHaveBeenCalledWith({"email": "test@testguy.com", "password": "testing", "username": "Test"}, undefined);
        expect(mockNavigate).toHaveBeenCalledWith("/login", { state: { message: undefined}});
    });

    test('test register function general error', async () => {
        const mockNavigate = jest.fn();
        useNavigate.mockReturnValue(mockNavigate);
        register.mockImplementation(() => {
            throw new Error("Database on fire")}
        );
       
        await act(async () => {
            render(<Register />);
        });

        await act(async () => {
            userEvent.type(screen.getByLabelText('Username'), "Test");
            userEvent.type(screen.getByLabelText('E-mail address'), "test@testguy.com");
            userEvent.type(screen.getByLabelText('Password'), "testing");
            userEvent.click(screen.getByRole('button', {name: /Register/i}));
        });

        expect(console.error).toHaveBeenCalledWith(Error('Database on fire'));
    });
});
