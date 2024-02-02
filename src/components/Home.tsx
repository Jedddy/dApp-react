import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Post from '../components/Post';
import { type Post as PostType } from "../types/post";

const Home = ({ contract }: { contract: ethers.Contract | null }): React.ReactNode => {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const cb = async () => {
            if (!contract) {
                return;
            }

            const posts: PostType[] = [];

            try {
                const data: any[] = Array.from(await contract.getPosts())                    

                for (let d of data) {
                    const post = {
                        id: Number(d[0]),
                        author: d[1],
                        content: d[2],
                        upvotes: Number(d[3]),
                        timestamp: new Date(Number(d[4]) * 1000),
                        alreadyUpvoted: await contract.alreadyUpvoted(Number(d[0])),
                    }

                    posts.push(post);
                }
            } catch (err) {
                setFailed(true);
                console.log(err);
            }

            setLoading(false);
            setPosts(posts);
        }

        cb();
    }, [contract]);

    const handleSubmit = async () => {
        if (!content) {
            alert('Post content can not be empty!');
            return;
        }

        try {
            await contract?.createPost(content);
            window.location.reload();
        } catch (e) {
            alert('Failed to post! Metamask might not be connected to the *arbitrum* sepolia network!');
            console.log(e);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    if (failed) {
        return <div className="mt-20">
            <p>Failed to load posts! Make sure you have metamask installed and connected to the *arbitrum* sepolia network.</p>
        </div>
    }

    if (loading) {
        return  <div className="mt-20">
            <p>Loading posts... Make sure your metamask is connected to the *arbitrum* sepolia network!</p>
        </div>
    }

    return <div className="mt-20 p-4">
        <div className="flex w-72 justify-between mb-20">
            <input className="ml-2 h-16 m-0" type="text" onChange={handleChange} placeholder="Post content..."/>
            <button className="bg-cyan-200 p-2 w-16 rounded" onClick={handleSubmit}>Post</button>
        </div>
        <h1 className="text-2xl ml-2">Posts</h1>
        <div className="flex">
            {
                posts.length && posts.map((post: PostType) => {
                    return <Post key={post.id} contract={contract} post={post} />
                }) || <p>No posts yet!</p>
            }
        </div>
    </div>
};

export default Home;
