import React from 'react';
import { render, screen, fireEvent, waitFor, act, getAllByRole, getByRole } from '@testing-library/react';
import { getOne } from "../models/fetch.js";
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import UpdateDoc from '../update-doc.jsx';
import userEvent from "@testing-library/user-event";
import Quill from 'quill';
import Delta from 'quill-delta';
import { EditorView } from 'codemirror';

// Mock socket
jest.mock('socket.io-client');

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

// Mock the getOne function
jest.mock("../models/fetch", () => ({
    getOne: jest.fn()
}));

describe('Socket tests', () => {
    let socketMock;

    beforeEach(() => {
      // Mock the socket instance
      socketMock = {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
        connect: jest.fn(),
        disconnect: jest.fn(),
      };
  
      io.mockReturnValue(socketMock);
    });
    afterAll(() => {
       jest.clearAllMocks();
    });

    // Tests that socket emits a create call when rendering component
    test('socket room creation', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content", mode: "text"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });
        expect(screen.getByLabelText('Title')).toHaveValue('Fake title');
        expect(document.getElementsByClassName('ql-editor')[0].textContent).toContain('Fake content');
        expect(socketMock.emit).toHaveBeenCalledWith("create", "091823901283");
    });

    // Tests that the socket emits correctly when the title is changed
    test('socket emit on title input', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content", mode: "text"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });
        
        await act(async () => {
            await screen.findByText("Fake content");
            userEvent.clear(screen.getByLabelText(/title/i));
            userEvent.type(screen.getByLabelText(/title/i), 'Fake updated title');
        });

        expect(socketMock.emit).toHaveBeenCalledWith("doc", {"id": "091823901283", "title": "F", "user": undefined});
        expect(socketMock.emit).toHaveBeenCalledWith("doc", {"id": "091823901283", "title": "Fa", "user": undefined});
        expect(socketMock.emit).toHaveBeenCalledWith("doc", {"id": "091823901283", "title": "Fake", "user": undefined});
        expect(socketMock.emit).toHaveBeenCalledWith("doc", {"id": "091823901283", "title": "Fake updated title", "user": undefined});

    });

    // Tests that socket emits properly when writing in code editor    
    test('socket emit on code input', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content", mode: "code"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });
        
        await act(async () => {
            await screen.findByText("Fake content");
            const editor = document.querySelector('.cm-content');
            const editorView = editor.cmView.view
            editorView.dispatch({
                changes: { from: 0, insert: "emitted " }
            });
        });
        expect(socketMock.emit).toHaveBeenCalledWith("doc", {id: "091823901283", content: "emitted Fake content", user: undefined, mode: "code"});
    });

    // Tests that the socket emits properly when editing in quill editor.
    test('socket emit on text input', async () => {
        useParams.mockReturnValue({id: "091823901283"});
        const mockResponse = {title: "Fake title", content: "Fake content", mode: "text"};
        getOne.mockResolvedValue(mockResponse);
        await act(async () => {
            render(<UpdateDoc />);
        });
        
        await act( async () => {
            await screen.findByText("Fake content");
            const quillEditor = document.getElementsByClassName('ql-container')[0];
            const quillInstance = Quill.find(quillEditor);
            expect(quillInstance).toBeInstanceOf(Quill);
            quillInstance.root.innerHTML = "Fake emitted content";
            quillInstance.root.dispatchEvent(new Event('text-change'));
        });
        const emittedDelta = new Delta({ops: [{"retain": 5}, {"insert": "emitted "}]})

        expect(socketMock.emit).toHaveBeenCalledWith("doc", {id: "091823901283", content: emittedDelta, user: undefined, title: "Fake title", mode: "text"});
    });

    // Tests that the socket behaves properly when a component dismounts

});
