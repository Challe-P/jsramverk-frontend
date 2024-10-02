import React from 'react';
import { getByRole, render, screen, act, getByText } from '@testing-library/react';
import App from '../App';
import { getAll } from '../models/fetch';
import { BrowserRouter } from "react-router-dom";

jest.mock("../models/fetch", () => ({
    getAll: jest.fn(),
}));

describe('Tests main app functionality', ()  => {
    beforeEach(() => {
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

    test("should render documents on start page", async () => {
        const mockResponse = { data: [
            { title: "Fake title", content: "Fake content"}, 
            { title: "A title", content: "Some content" }]};
        getAll.mockResolvedValue(mockResponse);
        await act(async () => {
            await render(<App />);
        })
        await screen.findByText('Home'); // Change here if header is changed.
        const links = screen.getAllByRole('link');
        const linkFake = links.some(link => link.textContent === "Fake title");
        const otherLink = links.some(link => link.textContent === "A title");
        expect(linkFake).toBe(true);
        expect(otherLink).toBe(true);        
    })
});
