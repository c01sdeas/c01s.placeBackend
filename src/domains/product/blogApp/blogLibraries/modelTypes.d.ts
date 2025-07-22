import {Document, Types} from "mongoose";

//userLibraries
interface ILibrary extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    status: boolean;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IBlogPostInLibrary extends Document {
    _id: Types.ObjectId;
    blogPostID: Types.ObjectId;
    libraryID: Types.ObjectId;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

//followingTags
interface IFollowingTag extends Document {
    _id: Types.ObjectId;
    tagID: Types.ObjectId;
    status: boolean;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    ILibrary,
    IBlogPostInLibrary,
    IFollowingTag
}