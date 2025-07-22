import { Schema, Model, model } from "mongoose";
import { ILibrary, IBlogPostInLibrary, IFollowingTag } from "./modelTypes.js";

const librarySchema : Schema<ILibrary> = new Schema<ILibrary>({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    }
}, { timestamps: true });

const librarySchemaExport : Model<ILibrary> = model('blogLibrary', librarySchema, 'blogLibraries');

const blogPostInLibrarySchema : Schema<IBlogPostInLibrary> = new Schema<IBlogPostInLibrary>({
    blogPostID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Blog post is required.'],
        trim: true,
    },
    libraryID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Library is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required.'],
        trim: true,
    }
}, { timestamps: true });

const blogPostInLibrarySchemaExport : Model<IBlogPostInLibrary> = model('blogPostInLibrary', blogPostInLibrarySchema, 'blogPostInLibraries');

//followingTags
const followingTagSchema : Schema<IFollowingTag> = new Schema<IFollowingTag>({
    tagID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Tag is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Status is required.'],
        trim: true,
    }
}, { timestamps: true });

const followingTagSchemaExport : Model<IFollowingTag> = model('followingTag', followingTagSchema, 'followingTags');

export {
    librarySchemaExport,
    blogPostInLibrarySchemaExport,
    followingTagSchemaExport
}