
export default function createCats(root) {
    
    return ({ cats }) => {
        root.innerHTML = '';

        for (const cat of cats) {
            const li = Cat({ cat });
            root.append(li);
        }
    };
}

function Cat({ cat }) {
    const li = document.createElement('li');
    li.classList.add('cat');

    const name = document.createElement('h3');
    name.textContent = cat.name;

    const img = document.createElement('img');
    img.src = cat.imageUrl; //add imageUrl column to supabase


    const comment = document.createElement('p');
    comment.textContent = cat.comments; //come back to tweak? needs to display all elements of array

    li.append(name, img);

    for (const comment of cat.comments) {
        const p = document.createElement('p');
        p.textContent = comment.content;
        li.append(p);
    }

    const form = document.createElement('form');

    const input = document.createElement('input');
    const button = document.createElement('button');

    form.append(input, button);

    form.addEventListener('submit', (e) => {
        // if !profile redirect
        // if profile, add comment (input value) to comments
    });

    li.append(form);
    
    return li;

}