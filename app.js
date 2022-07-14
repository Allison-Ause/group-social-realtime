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

    console.log(profile);

    display();
}

async function handleSignOut() {
    signOut();
}

async function handlAddComment(content) {


}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Cats = createCats(document.querySelector('#cat-list'));

function display() {
    User({ user, profile });
    Cats({ cats });
}

handlePageLoad();



// add Edit Profile button to pages

// handle commenting functionality
    //add second getProfile function to catalogue-service
    // display
    // realtime functionality based on user
    // redirect based on profile (out of comments section)
