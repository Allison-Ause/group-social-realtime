import { getAuthRedirect } from '../utils.js';
export default function createUser(root, { handleSignOut }) {

    return ({ user }) => {
        root.innerHTML = '';

        //pass in profile on line 4
        //set nameDisplay.textContent = profile.username
        //display avatar (append it to root)
        if (user) {
            const nameDisplay = document.createElement('span');
            const username = user?.email.split('@')[0];
            nameDisplay.textContent = username;

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });

            root.append(nameDisplay, signOutLink);
        }
        else {
            const signInLink = document.createElement('a');
            signInLink.textContent = 'Sign in';
            signInLink.href = getAuthRedirect();

            root.append(signInLink);
        }
    };
}

