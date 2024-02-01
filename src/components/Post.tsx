import React from "react";

import { Post as PostType } from "../types/post";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps): React.ReactNode => {
  return (
    <div className="bg-gray-200 w-96 rounded m-2 h-auto p-2">
      <p className="text-xs">{post.author}</p>
      <p className="mt-6 mb-6">{post.content}</p>
      <button className="hover:bg-gray-500 p-2 rounded">^</button>
    </div>
  ) 
};

export default Post;