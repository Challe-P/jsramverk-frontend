import React from 'react';
import { render, screen, fireEvent, waitFor, act, findByText } from '@testing-library/react';
import { getOne } from "../models/fetch.js";
import { useLocation, useParams } from 'react-router-dom';
import UpdateDoc from '../update-doc.jsx';
import userEvent from "@testing-library/user-event";
import Delta from 'quill-delta';
import Quill from 'quill';

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


describe('Tests comment function', () => {

    beforeAll(() => {
        //jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
        //global.console.error.mockRestore();
        jest.clearAllMocks();
    });

    test('tests comment button', async () => {
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

        await act( async () => {
            const quillEditor = document.getElementsByClassName('ql-container')[0];
            const quillInstance = Quill.find(quillEditor);
            expect(quillInstance).toBeInstanceOf(Quill);
            let spy = jest.spyOn(quillInstance, "getSelection");
            spy.mockReturnValue({index: 0, length: 10});
            const commentButton = document.getElementsByClassName('ql-comment')[0];
            userEvent.click(commentButton);
        });
 
        const commentHeader = await screen.getByText("Add a comment");
        expect(commentHeader).toBeInTheDocument();
    });

    test('tests if adding a comment works', async () => {
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

        await act( async () => {
            const quillEditor = document.getElementsByClassName('ql-container')[0];
            const quillInstance = Quill.find(quillEditor);
            expect(quillInstance).toBeInstanceOf(Quill);
            let spy = jest.spyOn(quillInstance, "getSelection");
            spy.mockReturnValue({index: 0, length: 10});
            const commentButton = document.getElementsByClassName('ql-comment')[0];
            userEvent.click(commentButton);
        });

        await act( async () => {
            const commentBox = document.getElementById('comment-input');
            userEvent.type(commentBox, "Nice text!");
            const saveCommentButton = document.getElementById("comment-save");
            userEvent.click(saveCommentButton);
        });

        const comment = document.getElementsByClassName('comment')[0];
        expect(comment).toBeInTheDocument();
        expect(comment).toHaveAttribute('comment');
        expect(comment.getAttribute('comment')).toBe("Nice text!");
    });

    test('tests if editing a comment works', async () => {
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
        
        await act(async () => {
            const quillEditor = document.getElementsByClassName('ql-container')[0];
            const quillInstance = Quill.find(quillEditor);
            expect(quillInstance).toBeInstanceOf(Quill);
            let spy = jest.spyOn(quillInstance, "getSelection");
            spy.mockReturnValue({index: 0, length: 10});
            const commentButton = document.getElementsByClassName('ql-comment')[0];
            userEvent.click(commentButton);
        });

        await act(async () => {
            await screen.findByText("Add a comment");
            const commentBox = document.getElementById('comment-input');
            userEvent.type(commentBox, "Nice text!");
            const saveCommentButton = document.getElementById("comment-save");
            userEvent.click(saveCommentButton);
        });

        act(() => {
            const comments = screen.getByText('Fake delta');
            fireEvent.click(comments);
        })
        
        await act(async () => {
            await screen.findByText("Edit comment");
            const newCommentBox = document.getElementById('comment-input');
            expect(newCommentBox).toHaveValue('Nice text!');
            userEvent.clear(newCommentBox);
            userEvent.type(newCommentBox, "The text is not that good...");
            const newSaveCommentButton = document.getElementById("comment-save");
            userEvent.click(newSaveCommentButton);
        })

        const comment = document.getElementsByClassName('comment')[0];
        expect(comment).toBeInTheDocument();
        expect(comment).toHaveAttribute('comment');
        expect(comment.getAttribute('comment')).toBe("The text is not that good...");     
    });
});
