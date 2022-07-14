import { getProfile, getUser, signOut } from '../services/auth-service.js';
import { addCat, uploadCat, onCat } from '../services/catalogue-service';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import createAddCat from '../components/AddCat.js';

// State
let user = null;
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    profile = await getProfile();

    onCat();

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddCat(name, image) {
    let url = '';

    url = await uploadCat(user.id, image);

    const newCat = {
        name,
        imageUrl: url
    };

    display();
}

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const AddCat = createAddCat(document.querySelector('form'), { handleAddCat });

function display() {
    User({ user, profile });
    AddCat();
}

handlePageLoad();