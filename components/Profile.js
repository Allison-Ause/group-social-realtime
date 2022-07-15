export default function createProfile(form, { handleUpdateProfile }) {
    const usernameInput = form.querySelector('input[name=user-name]');
    const avatarInput = form.querySelector('input[name=avatar]');
    const preview = form.querySelector('img');
    preview.classList.add('preview');


    avatarInput.addEventListener('change', () => {
        const [file] = avatarInput.files;
        preview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleUpdateProfile(
            formData.get('user-name'),  
            formData.get('avatar') 
        );

    });
    return ({ user, profile }) => {
        if (profile) {
            const { username, avatar_url } = profile;
            if (username) usernameInput.value = username;
            if (avatar_url) preview.src = avatar_url;
        }
        else {
            usernameInput.value = user.email.split('@')[0];
        }
    };
}