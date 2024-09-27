import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Tests main app functionality', ()  => {
    test("renders and displays start screen, header and footer", async () => {
        render(<App url="/" />);
        await screen.findByText('Home'); // Change here if header is changed.
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Home');
        const footerElement = screen.getByRole("contentinfo");
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveTextContent('Challe_P and narwhal');
    });
});
