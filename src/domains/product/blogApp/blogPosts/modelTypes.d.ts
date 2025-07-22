import {Document, Types} from "mongoose";

interface ISubscribeToNews extends Document {
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPost extends Document {
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: Types.ObjectId;
    status: boolean;
    viewCount: number;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPostVote extends Document {
    blogPostID: Types.ObjectId;
    username: string;
    vote: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPostViewLog extends Document {
    blogPostID: Types.ObjectId; // Which blog post was viewed
    viewerIp: string;                      // Viewer's IP address (for spam control)
    username?: string; // If user is logged in, ID
    viewedAt: Date;                        // Viewed time
    viewCount: number;
}

export type {
    ISubscribeToNews,
    IBlogPost,
    IBlogPostVote,
    IBlogPostViewLog
}