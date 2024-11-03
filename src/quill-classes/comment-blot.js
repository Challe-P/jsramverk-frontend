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
        node.addEventListener('click', (event) => {
            if (this.openPopup) {
                const currentComment = event.target.getAttribute('comment');
                const position = [event.clientX, event.clientY]
                this.openPopup(currentComment, node, position);
            }
        });

        return node;
    }

    static formats(node) {
        return node.getAttribute('comment');
    }
}

export default CommentBlot;
