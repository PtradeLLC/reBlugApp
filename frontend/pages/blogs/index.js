import React, { useEffect, useState } from 'react';
import GhostContentApi from '@tryghost/content-api';
import { Image } from 'next/image'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    //featured_image, title, author, name, 

    const api = new GhostContentApi({
        url: 'http://localhost:2368',
        key: `${process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY}`,
        version: 'v5.0'
    })

    async function getPosts() {
        return await api.posts
            .browse({
                include: ['tags, authors'],
                limit: 10
            }).catch(err => {
                throw new Error(err);
            });
    }

    return (
        <div className='mt-36' >
            {posts.map(post => (
                <div key={post.id}>
                    <h1>{post.title}</h1>
                    {/* <Image src={post.featured_image} width={100} height={100} /> */}
                </div>
            ))}
        </div>
    );
};

export default Posts;
