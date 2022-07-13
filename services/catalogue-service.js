import { checkResponse, client } from './client.js';

export async function getCatsWithComments() {
    const response = await client
        .from('cats')
        .select(`*,
        comments (*)
        `);
    
    return checkResponse(response);
    
}