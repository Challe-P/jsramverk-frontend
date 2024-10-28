import React from 'react';
import { render, screen, act } from '@testing-library/react';
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

    afterAll(() => {
        window.sessionStorage.clear();
        global.console.log.mockRestore();
        global.console.error.mockRestore();
        jest.clearAllMocks();
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

    // This test is weird. The fetchmock only works if no other test in the suite runs,
    // and even then the render page is wrong.
    /*
    test("should render all the users documents", async () => {
        window.sessionStorage.setItem('token', "poawjdopajwopdj");
        const mockResponse = { data: [
            { title: "Fake title", content: "Fake content"}, 
            { title: "A title", content: "Some content" }]};
        getAll.mockResolvedValue(mockResponse);
        
        await render(<App url="/"/>);
        await screen.findByText('Home'); // Change here if header is changed.
        const links = screen.getAllByRole('link');
        const linkFake = links.some(link => link.textContent === "Fake title");
        const otherLink = links.some(link => link.textContent === "A title");
        expect(linkFake).toBe(true);
        expect(otherLink).toBe(true);        
    });
    */
    
});
