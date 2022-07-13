
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
    comment.textContent = cat.comment; //come back to tweak?

    li.append(name, img, comment);

    return li;

}