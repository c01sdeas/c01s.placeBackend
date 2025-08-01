import { model, Schema, Model } from 'mongoose';
import { IComment } from './modelTypes.js';

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
    }
}, { timestamps: true });

const commentSchemaExport : Model<IComment> = model('comment', commentSchema, 'comments');

export {
    commentSchemaExport
}

