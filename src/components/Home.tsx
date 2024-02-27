import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Post from "../components/Post";
import Info from "./Info";
import { type Post as PostType } from "../types/post";

const Home = ({ contract }: { contract: ethers.Contract | null }): React.ReactNode => {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [content, setContent] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const cb = async () => {
        if (!contract) {
            return;
        }

        const posts: PostType[] = [];

        try {
            const data: any[] = Array.from(await contract.getPosts())                    

            const postPromises = data.map(async (d) => {
                const post = {
                    id: Number(d[0]),
                    author: d[1],
                    content: d[2],
                    upvotes: Number(d[3]),
                    timestamp: new Date(Number(d[4]) * 1000),
                    alreadyUpvoted: await contract.alreadyUpvoted(Number(d[0])),
                }
    
                posts.push(post);
            });
    
            await Promise.all(postPromises);    

            posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        } catch (err) {
            setFailed(true);
            console.log(err);
        }

        if (loading && !failed) {
            setLoading(false);
            setPosts(posts);
        }
    }

    useEffect(() => { cb(); }, [contract]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!content) {
            alert('Post content can not be empty!');
            return;
        }

        setButtonDisabled(true);

        try {
            const post = await contract?.createPost(content);
            await post.wait();
            await cb();
        } catch (e) {
            alert('Failed to post! Metamask might not be connected to the *arbitrum* sepolia network!');
            console.log(e);
        }

        setButtonDisabled(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    
    return <div className="mt-20 p-4">
        <form className="flex w-72 justify-between mb-20" onSubmit={handleSubmit}>
            <input className="ml-2 h-16 m-0 p-4 rounded bg-cyan-100" type="text" onChange={handleChange} placeholder="Post content..."/>
            <button className="bg-cyan-200 p-2 w-16 rounded disabled:opacity-75 hover:bg-cyan-400" type="submit" disabled={buttonDisabled}>Post</button>
        </form>
        {
            failed && <Info text="Failed to load posts! Make sure you have metamask installed and connected to the *arbitrum* sepolia network." /> ||
            loading && <Info text="Loading posts... Make sure your metamask is connected to the *arbitrum* sepolia network!" /> ||
            <>
                <h1 className="text-2xl ml-2">Posts</h1><div className="flex flex-wrap gap-x-32">
                    {posts.length && posts.map((post: PostType) => {
                        return <Post key={post.id} contract={contract} post={post} />;
                    }) || <p>No posts yet!</p>}
                </div>
            </>
        }
    </div>
};

export default Home;
