import { getProfile } from './auth-service.js';
import { checkResponse, client } from './client.js';

export async function getCatsWithComments() {
    const response = await client
        .from('cats')
        .select(`*,
        comments (*)
        `);
    
    return checkResponse(response);
    
}

export function onComment(listener) {
    client
        .from('posts')
        .on('INSERT', async (payload) => {
            console.log('change received', payload);
            const comment = payload.new;
            const user = await getProfile(comment.user_id);
            comment.user = user;
            // t.a. question: need to associate comment with cats
                // can we associate comment with cat in Cats.js or does it all need to be in here?
                // will separating it out override the realtime nature of the commenting?
            listener(comment);
        })
        .subscribe();
}


export async function addComment(content, cat, user) {
    const response = await client
        .from('comments')
        .insert({
            user_id: user.id,
            cat_id: cat.id,
            content
        })
        .single();
    
    
}