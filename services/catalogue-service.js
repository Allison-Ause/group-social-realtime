import { checkResponse, client } from './client.js';

let users = new Map();
let cats = new Map();

export async function getCatsWithComments() {
    const response = await client
        .from('cats')
        .select(`*,
        comments (*)
        `);
    
    return checkResponse(response);
    
}

export async function getComments() {
    const response = await client
        .from('comments')
        .select(`*,
        cats (*),
        profiles (*)
        `);
    
    return checkResponse(response);
}


export function onComment(listener) {
    client
        .from('comments')
        .on('INSERT', async (payload) => {
            // eslint-disable-next-line no-console
            console.log('change received', payload);
            const comment = payload.new;
            const profile = await getProfileById(comment.user_id);
            const cat = await getCatById(comment.cat_id);
            comment.cat = cat;
            comment.profiles = profile;

            listener(comment);
        })
        .subscribe();
}


export async function addComment(content, user, cat) {
    const response = await client //do we need this + cat, user parameters?)
        .from('comments')
        .insert({
            user_id: user.id,   //believed to be solved by onComment getIds
            cat_id: cat.id,
            content
        })
        .single();   
    
    return checkResponse(response); //do we need this?
}


export async function getProfileById(id) {
    if (users.has(id)) return users.get(id);

    const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    users.set(id, data);

    return data;
}

export async function getCatById(id) {
    if (cats.has(id)) return cats.get(id);

    const { data, error } = await client
        .from('cats')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    cats.set(id, data);

    return data;
}

