import React from 'react';

interface FormProps {
    onSubmit: (data: FormData) => void;
}

interface FormData {
    id: string; // may need to be changed
    title: string;
    content: string;
}
function Doc({ onSubmit }: FormProps ) {
    const [formData, setFormData] = React.useState<FormData>({ title: '', content: '', id: '' })
    // For future reference, maybe to be used to send PUT request to db on input?
    /*
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }
    */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // PUT request to database
        "use server";
        const id = formData.id;
        const title = formData.title;
        const content = formData.content;
        onSubmit(formData);
        try {
            // PUT request here
            //await db.updateDoc(id, title, content);
        } catch (err) {
            return err;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" defaultValue={formData.title}></input>
            <textarea name="content" defaultValue={formData.content}></textarea>
            <input type="submit" value="Uppdatera"></input>
        </form>
    );

}

export default Doc;
