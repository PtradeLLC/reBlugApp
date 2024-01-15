import GhostContentApi from '@tryghost/content-api';


const api = new GhostContentApi({
    url: 'http://localhost:2368',
    key: `${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}`,
    version: 'v5.0'
})

export default async function getPosts() {
    return await api.posts
        .browse({
            include: ['tags, authors'],
            limit: 10
        }).catch(err => {
            throw new Error(err);
        })
}