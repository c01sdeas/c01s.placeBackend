import {Document, Types} from "mongoose";

interface IComment extends Document {
    _id: Types.ObjectId;
    blogPostID: Types.ObjectId;
    comment: string;
    parentID?: Types.ObjectId;
    userNickname: string;
    username: string;
    status: boolean;
    voteCount: number;
    vote: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ICommentVote extends Document {
    _id: Types.ObjectId;
    commentID: Types.ObjectId;
    username: string;
    vote: number;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IComment,
    ICommentVote
}