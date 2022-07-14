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
    const response = await client 
        .from('comments')
        .insert({
            user_id: user.id,  
            cat_id: cat.id,
            content
        })
        .single();   
    
    return checkResponse(response); 
}

export function onCat() {
    client
        .from('cats')
        .on('INSERT', async (payload) => {
            // eslint-disable-next-line no-console
            console.log('change received', payload);
        }) //potentially we need more here?
        .subscribe();
}

export async function addCat(newCat) {
    const response = await client
        .from('cats')
        .insert(
            newCat
        )
        .single();

    return checkResponse(response);
}

const CAT_BUCKET = 'cats';

export async function uploadCat(userId, imageFile) {

    const catImageName = `cat/${userId}/${imageFile.name}`;

    const catBucket = client
        .storage
        .from(CAT_BUCKET);

    const { data, error } = await catBucket
        .upload(catImageName, imageFile, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
            //eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    const url = catBucket.getPublicUrl(data.Key.replace(`${CAT_BUCKET}/`, '')).publicURL;

    return url;
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

