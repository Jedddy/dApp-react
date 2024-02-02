import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Post from '../components/Post';
import { type Post as PostType } from "../types/post";

const Home = ({ contract }: { contract: ethers.Contract | null }): React.ReactNode => {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);

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

    if (failed) {
        return <div className="mt-20">
            <p>Failed to load posts! Make sure you have metamask installed and connected to the *arbitrum* sepolia network.</p>
        </div>
    }

    if (loading) {
        return  <div className="mt-20">
            <p>Loading posts... Make sure you have metamask installed and connected to the *arbitrum* sepolia network!</p>
        </div>
    }

    return <div className="mt-20 flex p-4">
        {
            posts.length && posts.map((post: PostType) => {
                return <Post key={post.id} post={post} />
            }) || <p>No posts yet!</p>
        }
    </div>
};

export default Home;
