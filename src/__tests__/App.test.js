import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Tests main app functionality', ()  => {
    test("renders and displays start screen", async () => {
        render(<App url="/" />);
        await screen.findByText('Home'); // Change here if header is changed.
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Home')
    });

    /*
    test('tests if clicking new route works', async () => {
        render(<App/>);
        const newLink = screen.getByText('New');
        console.log(newLink);
        fireEvent.click(newLink);
        await screen.findByText('Create document');
        expect(screen.getByRole('button').toHaveTextContent('Create document'));
    })
    */
});
