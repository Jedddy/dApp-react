import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import Post from '../components/Post';
import { type Post as PostType } from "../types/post";
import { AddressContext } from "../App";

const Home = ({ contract }: { contract: ethers.Contract }): React.ReactNode => {
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<PostType[]>([]);
    const { address } = useContext(AddressContext);

    useEffect(() => {
        const cb = async () => {
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
    }, [address]);

    if (failed) {
        return <div className="mt-20">
            <p>Failed to load posts! Make sure you have metamask installed.</p>
        </div>
    }

    return <div className="mt-20 flex p-4">
        {loading && <p>Loading...</p>}
        {
            posts.length && posts.map((post: PostType) => {
                return <Post key={post.id} post={post} />
            }) || <p>No posts yet!</p>
        }
    </div>
};

export default Home;