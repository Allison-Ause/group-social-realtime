import { getProfile, getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
import { addComment, getCatsWithComments, getComments, onComment } from './services/catalogue-service.js';
import createCats from './components/Cats.js';

// State
let user = null;
let cats = [];
let profile = null;
let comments = [];


// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    
    cats = await getCatsWithComments();
    comments = await getComments();
    profile = await getProfile();

    onComment(comment => {
        comments.unshift(comment);
        display();
    });


    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddComment(content, user, cat) {
    await addComment(content, user, cat);
    display();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Cats = createCats(document.querySelector('#cat-list'), { profile, comments, handleAddComment });

function display() {
    User({ user, profile });
    Cats({ profile, comments, cats, user });
}

handlePageLoad();




// move user styling to main
// style cat cards so avatar+username are together & cute


// add cats:
    // handleAddCat function
    // incorporate both uploadCat & addCat functions


