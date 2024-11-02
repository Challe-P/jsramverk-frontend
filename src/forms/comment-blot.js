import ReactQuill, { Quill } from 'react-quill-new';

const Inline = Quill.import('blots/inline');

class CommentBlot extends Inline {
    static blotName = 'comment'; // Namn på bloten
    static tagName = 'span'; // HTML-taggen vi vill använda
    static className = 'comment'; // Klass för CSS

    // Metod för att sätta attribut (ex. kommentaren)
    static create(value) {
        const node = super.create();
        node.setAttribute('comment', value);
        node.setAttribute('title', value); // Tooltip med kommentaren
        return node;
    }

    static formats(node) {
        return node.getAttribute('comment');
    }
}

export default CommentBlot;
