import { getProfile, getUser, signOut, updateProfile, uploadAvatar } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import createProfile from '../components/Profile.js';

// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleUpdateProfile(username, avatar) {
    let url = '';

    if (avatar.size) {
        url = await uploadAvatar(user.id, avatar);
    }

    const update = {
        id: user.id,
        username,
    };
    if (url) update.avatar_url = url;

    profile = await updateProfile(update);

    location.assign('/');
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Profile = createProfile(document.querySelector('form'), { handleUpdateProfile });

function display() {
    User({ user });
    Profile({ user, profile });
}

handlePageLoad();