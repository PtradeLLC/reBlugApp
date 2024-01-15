import React, { useEffect, useState } from 'react';
import { getPosts } from '../ghost-config';
import { Image } from 'next/image'

const Posts = () => {
    const [posts, setPosts] = useState([]);

    //featured_image, title, author, name, 



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error.message);
            }
        };

        fetchPosts();
    }, []);

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
