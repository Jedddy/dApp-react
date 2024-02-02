import React, { useState } from "react";

import { ImArrowUp2, ImArrowUp } from "react-icons/im";

import { Post as PostType } from "../types/post";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps): React.ReactNode => {
    const [upvoted, setUpvoted] = useState<boolean>(post.alreadyUpvoted);

    const handleOnClick = () => {
        if (upvoted) {
            alert('You have already upvoted this post! You can not take it back :(');
        }

        setUpvoted(true);
    };

    return (
        <div className="bg-gray-200 w-96 rounded m-2 h-auto p-2">
        <p className="text-xs">{post.author}</p>
        <p className="mt-6 mb-6">{post.content}</p>
        <button className="hover:bg-gray-500 p-2 rounded" onClick={handleOnClick}>
            {(post.alreadyUpvoted || upvoted) && <ImArrowUp /> || <ImArrowUp2 />}
        </button>
        </div>
  ) 
};

export default Post;