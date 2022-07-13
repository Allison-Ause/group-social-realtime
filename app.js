import { getProfile, getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { getCatsWithComments } from './services/catalogue-service.js';
import createCats from './components/Cats.js';

// State
let user = null;
let cats = [];
let profile = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    cats = await getCatsWithComments();
    profile = await getProfile();

    display();
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Cats = createCats(document.querySelector('#cat-list'));

function display() {
    User({ user });
    Cats({ cats });
}

handlePageLoad();


// profile set up
    // uploading avatars to bucket
    // confirm rls working
    // redirect based on profile
// event handlers
// services functions
// confirm display of comments