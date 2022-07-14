
export default function createCats(root, { handleAddComment }) {
    
    return ({ profile, comments, cats, user }) => {
        root.innerHTML = '';

        for (const cat of cats) {
            // const li = document.createElement('li');
            //const li = Cat({ cat, profile, comments, user, handleAddComment });
            const li = Cat({ cat, profile, comments, user, handleAddComment });
            root.append(li);
        }
    };
}


function Cat({ cat, profile, comments, user, handleAddComment }) {
    
    const li = document.createElement('li');
    li.classList.add('cat');

    const name = document.createElement('h3');
    name.textContent = cat.name;

    const img = document.createElement('img');
    img.src = cat.imageUrl; 
    img.classList.add('cat-img');

    li.append(name, img);

    for (const comment of comments) {
        if (comment.cat_id === cat.id) {

            const div = document.createElement('div');
            div.classList.add('user-display');

            const fullComment = document.createElement('div');
            fullComment.classList.add('full-comment');

            const userImg = document.createElement('img');

            if (comment.profiles.avatar_url) {
                userImg.src = comment.profiles.avatar_url; 
            }

            const span = document.createElement('span');
            span.textContent = comment.profiles?.username;

            const p = document.createElement('p');
            p.textContent = comment.content;

            div.append(userImg, span);
            fullComment.append(div, p);
            li.append(fullComment);
        }
    }

    const form = document.createElement('form');

    const input = document.createElement('input');

    const button = document.createElement('button');
    button.textContent = 'Comment';

    form.append(input, button);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!profile) {
            location.replace('../profile-page');
        }
        
        handleAddComment(input.value, user, cat);

    });

    li.append(form);
    
    return li;

}