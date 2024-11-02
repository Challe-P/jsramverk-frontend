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
        
        function editComment(event) {
            const newComment = prompt('Redigera kommentar:', event.target.getAttribute('comment'));
            if (newComment === null) {
                removeComment();
                return;
            } 
            event.target.setAttribute('comment', newComment);
        }
        
        function removeComment() {
            node.classList.remove('comment');
            node.removeAttribute('comment');
        }

        node.addEventListener('click', editComment);
        return node;
    }

    static formats(node) {
        return node.getAttribute('comment');
    }
}

export default CommentBlot;
