import React from 'react';
import { render, screen, act, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import { getAll } from '../models/fetch';

jest.mock("../models/fetch", () => ({
    getAll: jest.fn(),
}));

describe('Tests main app functionality', ()  => {
    
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
    });

    afterEach(() =>{
        window.sessionStorage.clear();
        cleanup();
        jest.clearAllMocks();
    });

    afterAll(() => {
        global.console.log.mockRestore();
        global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test("should render all the users documents", async () => {
        window.sessionStorage.setItem('token', "poawjdopajwopdj");
        const mockResponse = { data: [
            { title: "Fake title", content: "Fake content", _id: "7890872q4alksjf", mode: "code"}, 
            { title: "A title", content: "Some content", _id: "789087iug2q4alksjf", mode: "text"},
            { title: "Faker title", content: "Faker content", _id: "7890872sadsq4alksjf", mode: "code"}]};
        getAll.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<App />);
        });
        await screen.findByText('Fake title');
        const links = screen.getAllByRole('link');
        const linkFake = links.some(link => link.firstChild.textContent === "Fake title");
        const otherLink = links.some(link => link.firstChild.textContent === "A title");
        expect(linkFake).toBe(true);
        expect(otherLink).toBe(true);
        
    });

    test("renders and displays start screen, header and footer", async () => {
        render(<App url="/" />);
        await screen.findByText('Home'); // Change here if header is changed.
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Home');
        const footerElement = screen.getByRole("contentinfo");
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Challe_P and narwhal');
    });
    
    test("renders and displays start screen, checks for login form", async () => {
        render(<App url="/" />);
        await screen.findByText('Home'); // Change here if header is changed.
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Home');
        const loginForm = document.getElementsByClassName('login-form')[0];
        expect(loginForm).toBeInTheDocument();
    });

    test("tests logout button", async () => {
        window.sessionStorage.setItem('token', "poawjdopajwopdj");
        render(<App url="/" />);
        await screen.findByText('Home'); // Change here if header is changed.
        fireEvent.click(screen.getByRole('link', { name: /Logout/i }));
        expect(window.sessionStorage.getItem('token')).toBe(null);
        expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument;
    });
});
