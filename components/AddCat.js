export default function createAddCat(form, { handleAddCat }) {

    const imageInput = form.querySelector('input[name=new-cat-image');
    const preview = form.querySelector('img');
    preview.classList.add('cat-preview');

    imageInput.addEventListener('change', () => {
        const [file] = imageInput.files;
        preview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleAddCat(formData.get('new-cat-name'), formData.get('new-cat-image'));

        location.assign('/');
    });

    return () => {

    };
}