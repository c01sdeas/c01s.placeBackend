import {Document, Types} from "mongoose";

interface IComment extends Document {
    _id: Types.ObjectId;
    blogPostID: Types.ObjectId;
    comment: string;
    parentID?: Types.ObjectId;
    userNickname: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IComment
}