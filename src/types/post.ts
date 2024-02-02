export type Post = {
    id: number;
    author: string;
    content: string;
    upvotes: number;
    timestamp: Date;
    alreadyUpvoted: boolean;
};