import { getProfile, getUser, signOut } from '../services/auth-service.js';
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

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddCat(name, image) {

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