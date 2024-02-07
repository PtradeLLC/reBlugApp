// lib/posts.js

import GhostContentApi from '@tryghost/content-api';

const api = new GhostContentApi({
    url: `${process.env.NEXT_PUBLIC_GHOST_API_URL}`,
    key: `${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}`,
    version: 'v5.0'
});

export async function getPosts() {
    return await api.posts
        .browse({
            include: ['tags, authors'],
            limit: 'all',
            formats: 'plaintext'
        }).catch(err => {
            throw new Error(err);
        })
}

export async function getSinglePost(postSlug) {
    try {
        const post = await api.posts.read({
            slug: postSlug
        });
        return post;
    } catch (error) {
        console.error(error);
        return null;
    }
}
