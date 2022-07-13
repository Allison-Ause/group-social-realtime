

export default function createProfile(form) {
    const avatarInput = form.querySelector('input[name=avatar]');
    const preview = form.querySelector('img');


    avatarInput.addEventListener('change', () => {
        const [file] = avatarInput.files;
        preview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleUpdateProfile(
            formData.get('user-name'), //= 
            formData.get('avatar') //= imageFile
        );

    });
    return () => {};
}