
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
    img.src = cat.imageUrl; //add imageUrl column to supabase

    li.append(name, img);

    for (const comment of comments) {
        if (comment.cat_id === cat.id) {
            const p = document.createElement('p');
            p.textContent = comment.content;
            li.append(p);
        }
    }

    const form = document.createElement('form');

    const input = document.createElement('input');

    const button = document.createElement('button');
    button.textContent = 'Comment';

    form.append(input, button);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(profile);
        if (!profile) {
            location.replace('../profile-page');
        }
        
        handleAddComment(input.value, user, cat);

    });

    li.append(form);
    
    return li;

}