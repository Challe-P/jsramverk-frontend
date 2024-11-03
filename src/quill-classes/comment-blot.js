import ReactQuill, { Quill } from 'react-quill-new';

const Inline = Quill.import('blots/inline');

class CommentBlot extends Inline {
    static blotName = 'commentblot';
    static tagName = 'span';
    static className = 'comment';

    static setPopupFunction(openPopupFunc) {
        this.openPopup = openPopupFunc;
    }

    static create(value) {
        const node = super.create();
        node.setAttribute('comment', value);
        
        /*
        function editComment(event) {
            const newComment = prompt('Redigera kommentar:', event.target.getAttribute('comment'));
            if (newComment === null || newComment === "") {
                removeComment();
                return;
            } 
            event.target.setAttribute('comment', newComment);
        }
        */
        
        function removeComment() {
            node.classList.remove('comment');
            node.removeAttribute('comment');
        }

        node.addEventListener('click', (event) => {
            if (this.openPopup) {
                const currentComment = event.target.getAttribute('comment');
                this.openPopup(currentComment, node);
            }
        });
        return node;
    }

    static formats(node) {
        return node.getAttribute('comment');
    }
}

export default CommentBlot;
