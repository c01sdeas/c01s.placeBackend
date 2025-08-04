import { model, Schema, Model } from 'mongoose';
import { IComment, ICommentVote } from './modelTypes.js';

const commentSchema : Schema<IComment> = new Schema<IComment>({
    blogPostID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Blog post is required.'],
        trim: true,
    },
    comment: {
        type: String,
        required: [true, 'Comment is required.'],
        trim: true,
    },
    parentID: {
        type: Schema.Types.ObjectId,
        required: [false, 'Parent is not required.'],
        default: null,
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

const commentSchemaExport : Model<IComment> = model('comment', commentSchema, 'comments');

const commentVoteSchema : Schema<ICommentVote> = new Schema<ICommentVote>({
    commentID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Comment is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    },
    vote: {
        type: Number,
        default: 0,
        required: [true, 'Vote is required.'],
        trim: true,
    }
}, { timestamps: true });

const commentVoteSchemaExport : Model<ICommentVote> = model('commentVote', commentVoteSchema, 'commentVotes');

export {
    commentSchemaExport,
    commentVoteSchemaExport
}

